import { IAuthService } from "./service";
import { Response, Request } from "express";

export interface IAuthController {
    kek: (req: Request, res: Response ) => Promise<any>
}

export class AuthController implements IAuthController {
    private service;

    constructor(service: IAuthService) {
        console.log('heh', service);
        this.service = service;
    }

     kek = async (req: Request, res: Response ) => {
        return this.service.test(req, res);
    }
}