import { Response, Request } from "express";
import User from "./user";
import UserRepository, { IUserRepository } from "./repository";
import * as jwt from 'jsonwebtoken'
import envs from '../../config';
import { TokenType } from "../../interfaces/tokenType";

export interface IUserService {
    createUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (req: Request, res: Response) =>  Promise<Response<User>>;
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
        console.log('here', user)
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
        console.log('update', result);
        return res.status(200).json(result);
    }

    async getUser(req: Request, res: Response) {
        //@ts-ignore
        const acc = req.user.toJSON();
        return res.status(200).json({
            user: {
                ...acc
            },
        });
    }
}