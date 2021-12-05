import { Response, Request, NextFunction } from "express";
import { JWTType, TokenType } from "../../interfaces/tokenType";
import User from "../user/user";
import AppleStrategy from "./strategies/appleStrategy";
import AuthenticationContext from "./strategies/authenticationContext";
import GoogleStrategy from "./strategies/googleStategy";
import JWTStrategy from "./strategies/authStrategy";
import * as jwt from "jsonwebtoken";
import envs from '../../config';
import { IUserService, UserService } from "../user/service";
import InjectableContainer from "../../application/InjectableContainer";
import AuthStrategy from "./strategies/authStrategy";
import { IRedisRepository } from "./datasource/redis";
import jwtFactory from "./factories/jwtFactory";
import { IAuthRepository } from "./repository";
import AuthenticationData, { IAuthData } from "./valueObjects/authenticationData";
import { CustomRequest } from "../../interfaces/request";
import { JWTTokens } from "../../interfaces/jwtTokens";

export interface IAuthService {
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
    googleCallBack: (req: Request, res: Response) => Promise<void | Response>;
    registerUser: (authData: AuthenticationData) => Promise<JWTTokens>
    loginUser: (email: string, password: string) => Promise<JWTTokens>;
    logout: (req: Request, res: Response) => Promise<void | Response>;
    getUserByGoogleId: (token: string) => Promise<User>;
    create: (userId: number, googleToken: string) => Promise<void>
    refreshToken: (token: string) => Promise<JWTTokens>;
}

export class AuthService implements IAuthService {
    private userService: IUserService;
    private redisRepository: IRedisRepository;
    private repository: IAuthRepository;
    constructor({ userService, redisRepository, authRepository }: { userService: IUserService, redisRepository: IRedisRepository, authRepository: IAuthRepository }) {
        this.userService = userService;
        this.redisRepository = redisRepository;
        this.repository = authRepository;
    }

    async refreshToken(token: string): Promise<JWTTokens> {
        const userId = await this.repository.getUserAuthByRefreshToken(token);
        if (!userId) {
            throw new Error('error no userId');
        }
        return await jwtFactory.createTokenPair(+userId);
    }

    async loginUser(email: string, password: string): Promise<JWTTokens> {
        const user = await this.userService.verifyUser(email, password);
        if (!user) {
            throw new Error('no user');
        }
        const tokens = await jwtFactory.createTokenPair(user.id);
        await this.repository.saveRefreshToken(tokens.refreshToken, user.id);
        return tokens;
    }

    async middleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let authContext = new AuthenticationContext();
        const authHeader = req.headers["authorization"];
        const tokenInHeader = authHeader && authHeader.split(" ")[1];
        let token;
        let type;
        if (authHeader && tokenInHeader) {
            token = tokenInHeader;
            type = TokenType.jwt
        }
        if (!authHeader && (req.cookies.googleToken || req.cookies.appleToken)) {
            token = req.cookies.googleToken ? req.cookies.googleToken : req.cookies.appleToken;
            type = req.cookies.googleToken ? TokenType.google : TokenType.apple
        }
        if (!type || !token) {
            return res.status(409).end();
        }
        try {
            switch (type) {
                case TokenType.google:
                    authContext.setStrategy(new GoogleStrategy({ authService: this as IAuthService, userService: this.userService }));
                    break;
                case TokenType.apple:
                    authContext.setStrategy(new AppleStrategy());
                    break;
                default:
                    authContext.setStrategy(new AuthStrategy({ userService: this.userService }));
                    break;
            }
            const user = await authContext.verify(token);

            if (!user) return res.status(409).end();
            //@ts-ignore
            req.user = user;
            return next();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async create(userId: number, googleToken: string) {
        await this.repository.create(userId, googleToken);
    }

    async getUserByGoogleId(id: string) {
        return this.repository.getUserByIdentity(id, TokenType.google)
    }

    async validate(token: string) {
        const isValid = jwtFactory.validate(token);
        if (!isValid) {
            throw Error('is not valid');
        }
        const id = await this.redisRepository.get(token);

        if (!id) {
            throw Error('is not in session');
        }

        return id;
    }

    async registerUser(data: IAuthData): Promise<JWTTokens> {
        const authData = new AuthenticationData(data)
        const isExists = await this.userService.isUserExists(authData.email);
        const authUser = new AuthenticationData({ email: authData.email, name: authData.name, password: authData.password })
        if (isExists) {
            throw new Error('does not exist');
        };
        const user = await this.userService.create(authUser);
        await this.create(user.id, null);
        if (!user) {
            throw new Error('error in save');
        }
        const tokens = await jwtFactory.createTokenPair(user.id);
        this.repository.saveRefreshToken(tokens.refreshToken, user.id);
        return tokens;
    }

    async googleCallBack(data: any) {
        console.log('data', data)
    }

    async logout(req: CustomRequest, res: Response) {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            return this.repository.saveRefreshToken(null, req.user.id);
        }

        res.clearCookie('googleToken');
        return res.status(200);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthService, 'authService', ['userService', 'redisRepository', 'authRepository']);
});

export default init;