import { Response, Request } from "express";
import Account from "./account";

export interface IAccountService {
    createAccount: (req: Request, res: Response) => Promise<Response>;
    updateAccount: (req: Request, res: Response) => Promise<Response>;
    deleteAccount: (req: Request, res: Response) => Promise<Response>;
    getAccount: (req: Request, res: Response) => Promise<Response>;
}

export class AccountService {
    constructor() {}

    async createAccount(req: Request, res: Response): Promise<Response> {
        const account = new Account(req.body);
        return res.status(200).send('heh');
    }

    async updateAccount(req: Request, res: Response): Promise<Response> {
        return res.status(200).send('heh');
    }

    async deleteAccount(req: Request, res: Response): Promise<Response> {
        return res.status(200).send('heh');
    }

    async getAccount(req: Request, res: Response): Promise<Response> {
        return res.status(200).send('heh');
    }
}