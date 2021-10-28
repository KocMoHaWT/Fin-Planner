import { Response, Request } from "express";
import User, { IUser } from "./user";
import UserRepository, { IUserRepository } from "./repository";
import * as jwt from 'jsonwebtoken'
import envs from '../../config';
import { TokenType } from "../../interfaces/tokenType";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";

export interface IUserService {
    createUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (id: number) =>  Promise<User>;
    sendUserToFront: (req: CustomRequest, res: Response) => Promise<Response<IUser>>;
}

export class UserService {
    private repository;
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async createUser(req: Request, res: Response) {
        const isExists = await this.repository.isUserExists(req.body.email);
        if (isExists) return res.status(409).end();
        const user = await this.repository.create(req.body);
        const accessToken = await jwt.sign({ id: user.id, type: TokenType.jwt }, envs.jwtSecret, {
            expiresIn: envs.accessExpire,
        }); 
        const refreshToken = await jwt.sign({ id: user.id, type: TokenType.jwt }, envs.jwtSecret, {
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

InjectableContainer.setDependency(UserService, 'userService', ['userRepository'])