import { IAccountService } from "./service";
import { Response, Request } from "express";

export interface IAccountController {
    create: (req: Request, res: Response ) => Promise<any>;
    update: (req: Request, res: Response ) => Promise<any>;
    read: (req: Request, res: Response ) => Promise<any>;
    delete: (req: Request, res: Response ) => Promise<any>;
}

export class AccountController implements IAccountController {
    private service: IAccountService;

    constructor(service: IAccountService) {;
        this.service = service;
    }

    async create(req: Request, res: Response ) {
        return this.service.createAccount(req, res);
    }

    async read(req: Request, res: Response ) {
        return this.service.getAccount(req, res);
    }

    async delete(req: Request, res: Response ) {
        return this.service.deleteAccount(req, res);
    }

    async update(req: Request, res: Response ) {
        return this.service.updateAccount(req, res);
    }
}