import { IAuthService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthController {
    kek: (req: Request, res: Response ) => Promise<any>
}

export class AuthController implements IAuthController {
    private service: IAuthService;

    constructor({ authService }: { authService: IAuthService }) {
        ;
        this.service = authService;
    }

    async kek(req: Request, res: Response) {
        return {};
    }
}

InjectableContainer.setDependency(AuthController, 'authController', ['authService'])