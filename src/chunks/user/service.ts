import { Response, Request } from "express";
import User, { IUser } from "./user";
import UserRepository, { IUserRepository } from "./repository";

import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";
import AuthData from "../auth/valueObjects/authenticationData";

export interface IUserService {
    create: (body: AuthData) => Promise<User>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    loginUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (id: number) => Promise<User>;
    sendUserToFront: (req: CustomRequest, res: Response) => Promise<Response<IUser>>;
    verifyUser: (email: string, password: string) => Promise<User>;
    isUserExists: (email: string) => Promise<boolean>;
}

export class UserService {
    private repository;
    constructor({ userRepository }: { userRepository: IUserRepository }) {
        this.repository = userRepository;
    }

    async create(body: AuthData) {
        await this.repository.create(body);
        return  await this.repository.findByEmail(body.email);
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

    async isUserExists(email: string) {
        return this.repository.isUserExists(email);
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(UserService, 'userService', ['userRepository']);
});

export default init;