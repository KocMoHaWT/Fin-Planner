import { IUserService } from "./service";
import { Response, Request } from "express";

export interface IUserController {
    create: (req: Request, res: Response ) => Promise<any>;
    update: (req: Request, res: Response ) => Promise<any>;
    read: (req: Request, res: Response ) => Promise<any>;
    delete: (req: Request, res: Response ) => Promise<any>;
}

export class UserController implements IUserController {
    private service;

    constructor(service: IUserService) {;
        this.service = service;
    }

    async create(req: Request, res: Response ) {
        return this.service.create(req, res);
    }

    async read(req: Request, res: Response ) {
        return this.service.read(req, res);
    }

    async delete(req: Request, res: Response ) {
        return this.service.delete(req, res);
    }

    async update(req: Request, res: Response ) {
        return this.service.update(req, res);
    }
}