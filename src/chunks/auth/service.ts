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

export interface IAuthService {
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
    googleCallBack: (req: Request, res: Response) => Promise<void | Response>;
}

export class AuthService implements IAuthService {
    private userService: IUserService;
    private redisRepository: IRedisRepository;
    constructor({ userService, redisRepository }: { userService: IUserService, redisRepository: IRedisRepository }) {
        this.userService = userService;
        this.redisRepository = redisRepository;
    }

    async middleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        // const type = req.body.type;
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).end();
        }

        try {
            const user = await this.validate(token);
            //@ts-ignore
            req.user = user;
            return next();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async loginUser(req: Request, res: Response) {
        let authContext = new AuthenticationContext();
        const tokenInBody = req.body?.token;
        if ((!req.body.email || !req.body.password) && !tokenInBody) {
            return res.status(409).end();
        }

        switch (tokenInBody) {
            case TokenType.google:
                authContext.setStrategy(new GoogleStrategy({ userService: this.userService }));
                break;
            case TokenType.apple:
                authContext.setStrategy(new AppleStrategy());
                break;
            default:
                authContext.setStrategy(new AuthStrategy({ userService: this.userService }));
                break;
        }
        let user
        if (tokenInBody) {
            user = await authContext.verifyByToken(tokenInBody);
        } else {
            user = await authContext.verifyByCredentials(req.body.email, req.body?.passowrd);
        }

        if (!user) return res.status(409).end();
        const accessToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
            expiresIn: envs.accessExpire,
        });
        const refreshToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
            expiresIn: envs.refreshExpire,
        });
        this.redisRepository.set(accessToken, user.id);
 
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }

    async validate(token: string) {

    }


    async createPairOfTokens(id: number) {
        const accessToken = await jwt.sign({ id }, envs.jwtSecret, {
            expiresIn: envs.accessExpire,
        });
        const refreshToken = await jwt.sign({ id }, envs.jwtSecret, {
            expiresIn: envs.refreshExpire,
        });
        return { accessToken, refreshToken }
    }

    async googleCallBack(data: any) {
        console.log('data', data)
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthService, 'authService', ['userService', 'redisRepository', 'authRepository']);
});

export default init;