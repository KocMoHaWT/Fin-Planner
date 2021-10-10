import { Response, Request } from "express";
import Account from "./account";
import AccountRepository, { IAccountRepository } from "./repository";

export interface IAccountService {
    createAccount: (req: Request, res: Response) => Promise<Response>;
    updateAccount: (req: Request, res: Response) => Promise<Response>;
    deleteAccount: (req: Request, res: Response) => Promise<Response>;
    getAccount: (req: Request, res: Response) => Promise<Response>;
}

export class AccountService {
    private repository;
    constructor(repository: IAccountRepository) {
        this.repository = repository;
    }

    async createAccount(req: Request, res: Response): Promise<Response> {
        await this.repository.create(req.body);
        return res.status(200);
    }

    async updateAccount(req: Request, res: Response): Promise<Response> {
        const result = await this.repository.update(req.body);
        return res.status(200).json(result);
    }

    async getAccount(req: Request, res: Response): Promise<Response> {
        const acc = req.account.toJSON();
        return res.status(200).json({
            account: {
                ...acc
            },
        });
    }
}