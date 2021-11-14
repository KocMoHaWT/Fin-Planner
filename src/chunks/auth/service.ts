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
import AuthenticationData from "./valueObjects/authenticationData";
import { CustomRequest } from "../../interfaces/request";

export interface IAuthService {
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
    googleCallBack: (req: Request, res: Response) => Promise<void | Response>;
    registerUser: (req: Request, res: Response) => Promise<void | Response>;
    loginUser: (req: Request, res: Response) => Promise<void | Response>;
    logout: (req: Request, res: Response) => Promise<void | Response>;
    getUserByGoogleId: (token: string) => Promise<User>;
    create: (userId: number) => Promise<void>
    refreshToken: (req: Request, res: Response) => Promise<void | Response>;
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

    async refreshToken(req: Request, res: Response): Promise<void | Response> {
        const token = req.body?.token;

        if (!token) {
            return res.status(401).end();
        }

        try {
            const userId = await this.repository.getUserAuthByRefreshToken(token);
            if (!userId) return res.status(401).end('error no userId');
            const tokens = await jwtFactory.createTokenPair(+userId);
            res.status(200).json(tokens);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void | Response> {
        try {
            const user = await this.userService.verifyUser(req.body.email, req.body.password);
            if (!user) {
                res.status(400).end();
            }
            const tokens = await jwtFactory.createTokenPair(user.id);
            await this.repository.saveRefreshToken(tokens.refreshToken, user.id);
            console.log('wa');
            return res.status(201).json({
                ...tokens
            });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async middleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let authContext = new AuthenticationContext();
        const authHeader = req.headers["authorization"];
        console.log(authHeader);
        const tokenInHeader = authHeader && authHeader.split(" ")[1];
        console.log('tokenINheader', tokenInHeader);
        let token;
        let type;
        if (authHeader && tokenInHeader) {
            token = tokenInHeader;
            type = TokenType.jwt
        } 
        if (!authHeader && (req.cookies.googleToken || req.cookies.appleToken)){
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
            console.log('user', user);

            if (!user) return res.status(409).end();
            //@ts-ignore
            req.user = user;
            return next();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async create(userId: number) {
        await this.repository.create(userId);
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

    async registerUser(req: Request, res: Response): Promise<void | Response> {
        try {
            const isExists = await this.userService.isUserExists(req.body.email);
            const authUser = new AuthenticationData({ email: req.body.email, name: req.body.name, password: req.body.password })
            if (isExists) return res.status(409).end();
            const user = await this.userService.create(authUser);
            await this.create(user.id);
            if (!user) {
                throw new Error('error in save');
            }
            const tokens = await jwtFactory.createTokenPair(user.id);
            this.repository.saveRefreshToken(tokens.refreshToken, user.id);
            return res.status(200).json({ ...tokens });
        } catch (error) {
            return res.status(409).end();
        }
    }

    async googleCallBack(data: any) {
        console.log('data', data)
    }

    async logout(req: CustomRequest, res: Response) {
        if (!req.user) return res.status(400).end();
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