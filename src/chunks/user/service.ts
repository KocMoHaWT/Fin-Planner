import { Response, Request } from "express";
import User, { IUser } from "./user";
import UserRepository, { IUserRepository } from "./repository";

import { TokenType } from "../../interfaces/tokenType";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";
import AuthenticationContext from "../auth/strategies/authenticationContext";
import AuthStrategy from "../auth/strategies/authStrategy";
import GoogleStrategy from "../auth/strategies/googleStategy";
import AppleStrategy from "../auth/strategies/appleStrategy";

export interface IUserService {
    createUser: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    loginUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (id: number) => Promise<User>;
    sendUserToFront: (req: CustomRequest, res: Response) => Promise<Response<IUser>>;
    verifyUser: (email: string, password: string) => Promise<User>;
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
        // const accessToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
        //     expiresIn: envs.accessExpire,
        // });
        // const refreshToken = await jwt.sign({ id: user.id }, envs.jwtSecret, {
        //     expiresIn: envs.refreshExpire,
        // });
        return user;
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

    async verifyUser(email: string, password: string) {
        return this.repository.verifyUser(email, password);
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(UserService, 'userService', ['userRepository']);
});

export default init;