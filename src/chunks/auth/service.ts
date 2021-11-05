import { Response, Request, NextFunction } from "express";
import { JWTType, TokenType } from "../../interfaces/tokenType";
import User from "../user/user";
import AppleStrategy from "../user/strategy/appleStrategy";
import AuthenticationContext from "../user/strategy/authenticationContext";
import GoogleStrategy from "../user/strategy/googleStategy";
import JWTStrategy from "../user/strategy/AuthStrategy";
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
        let authContext = new JWTStrategy(this.userService.getUser.bind(this.userService));
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
    InjectableContainer.setDependency(AuthService, 'authService', ['userService']);
});

export default init;