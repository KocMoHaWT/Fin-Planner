import { Response, Request, NextFunction } from "express";
import { JWTType, TokenType } from "../../interfaces/tokenType";
import User from "../user/user";
import AppleStrategy from "./strategy/appleStrategy";
import AuthenticationContext from "./strategy/authenticationContext";
import GoogleStrategy from "./strategy/googleStategy";
import JWTStrategy from "./strategy/jwtStrategy";
import * as jwt from "jsonwebtoken";
import envs from '../../config';
import { IUserService, UserService } from "../user/service";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthService {
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
}

export class AuthService implements IAuthService {
    private userService: IUserService;
    constructor({ userService }: { userService: IUserService }) {
        this.userService = userService;
    }

    async middleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        let authContext = new AuthenticationContext();
        const type = req.body.type;
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!type || !token) {
            return res.status(401).end();
        }

        switch (type) {
            case TokenType.google:
                authContext.setStrategy(new GoogleStrategy());
                break;
            case TokenType.apple:
                authContext.setStrategy(new AppleStrategy());
                break;
            default:
                authContext.setStrategy(new JWTStrategy(this.userService.getUser));
                break;
        }

        try {
            const user = await authContext.validate(token);
            if (typeof user === 'number') {
                return next();
            }
            //@ts-ignore
            req.user = user;
            return next();
        } catch (error) {
            return res.status(400).json({ error });
        }
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
}

InjectableContainer.setDependency(AuthService, 'authService', ['userService']);