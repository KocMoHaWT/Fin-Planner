import { Response, Request, NextFunction } from "express";
import { JWTType, TokenType } from "../../interfaces/tokenType";
import User from "../user/user";
import AppleStrategy from "./strategy/appleStrategy";
import AuthenticationContext from "./strategy/authenticationContext";
import GoogleStrategy from "./strategy/googleStategy";
import JWTStrategy from "./strategy/jwtStrategy";
import * as jwt from "jsonwebtoken";
import envs from '../../config';

export interface IAuthService {
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
}

export class AuthService implements IAuthService {
    /// userRepo as dependecy
    constructor() { }

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
                authContext.setStrategy(new JWTStrategy());
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

    async createToken(id: number, type: JWTType) {
        return jwt.sign({ id, type }, envs.jwtSecret, {
            expiresIn: type === JWTType.access ? envs.accessExpire : envs.refreshExpire,
        });
    }
}