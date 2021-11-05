import { Response, Request } from "express";
import User, { IUser } from "./user";
import UserRepository, { IUserRepository } from "./repository";
import * as jwt from 'jsonwebtoken'
import envs from '../../config';
import { TokenType } from "../../interfaces/tokenType";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";
import AuthenticationContext from "./strategy/authenticationContext";
import AuthStrategy from "./strategy/AuthStrategy";
import GoogleStrategy from "./strategy/googleStategy";
import AppleStrategy from "./strategy/appleStrategy";

export interface IUserService {
    createUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    loginUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (id: number) => Promise<User>;
    sendUserToFront: (req: CustomRequest, res: Response) => Promise<Response<IUser>>;
}

export class UserService {
    private repository;
    constructor({ userRepository }: { userRepository: IUserRepository }) {
        this.repository = userRepository;
    }

    async createUser(req: Request, res: Response) {
        const isExists = await this.repository.isUserExists(req.body.email);
        if (!isExists) return res.status(409).end();
        await this.repository.create(req.body);
        const user = await this.repository.findByEmail(req.body.email);
        const accessToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
            expiresIn: envs.accessExpire,
        });
        const refreshToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
            expiresIn: envs.refreshExpire,
        });
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }

    async loginUser(req: Request, res: Response) {
        let authContext = new AuthenticationContext();
        const tokenInBody = req.body?.token;
        if ((!req.body.email || !req.body.password) && !tokenInBody) {
            return res.status(409).end();
        }

        switch (tokenInBody) {
            case TokenType.google:
                authContext.setStrategy(new GoogleStrategy({ userService: this as IUserService}));
                break;
            case TokenType.apple:
                authContext.setStrategy(new AppleStrategy());
                break;
            default:
                authContext.setStrategy(new AuthStrategy({ repository: this.repository}));
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
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const result = await this.repository.update(req.body);
        return res.status(200).json(result);
    }

    async getUser(id: number) {
        const result = await this.repository.findById(id);
        return result;
    }

    async sendUserToFront(req: CustomRequest, res: Response) {
        if (!req?.user) return null;
        return res.status(200).json(req?.user.toJSON());
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(UserService, 'userService', ['userRepository']);
});

export default init;