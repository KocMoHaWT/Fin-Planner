import { Response, Request } from "express";
import User from "./user";
import UserRepository, { IUserRepository } from "./repository";

export interface IUserService {
    createUser: (req: Request, res: Response) => Promise<Response>;
    updateUser: (req: Request, res: Response) => Promise<Response>;
    deleteUser: (req: Request, res: Response) => Promise<Response>;
    getUser: (req: Request, res: Response) => Promise<Response>;
}

export class UserService {
    private repository;
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        await this.repository.create(req.body);
        return res.status(200);
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const result = await this.repository.update(req.body);
        return res.status(200).json(result);
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        const acc = req.user.toJSON();
        return res.status(200).json({
            User: {
                ...acc
            },
        });
    }
}