import { IAuthService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthController {
    kek: (req: Request, res: Response ) => Promise<any>
    googleCallback: (req: Request, res: Response) => Promise<void | Response>
}

export class AuthController implements IAuthController {
    private service: IAuthService;

    constructor({ authService }: { authService: IAuthService }) {
        this.service = authService;
    }

    async kek(req: Request, res: Response) {
    }

    async googleCallback(req: Request, res: Response) {
        this.service.googleCallBack(req, res);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthController, 'authController', ['authService']);
});

export default init;