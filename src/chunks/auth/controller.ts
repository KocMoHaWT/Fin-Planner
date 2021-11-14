import { IAuthService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthController {
    refreshToken: (req: Request, res: Response ) => Promise<any>;
    googleCallback: (req: Request, res: Response) => Promise<void | Response>;
    register: (req: Request, res: Response) => Promise<any>;
    login: (req: Request, res: Response) => Promise<any>;
    logout: (req: Request, res: Response) => Promise<any>;
}

export class AuthController implements IAuthController {
    private service: IAuthService;

    constructor({ authService }: { authService: IAuthService }) {
        this.service = authService;
    }

    async refreshToken(req: Request, res: Response) {
        return this.service.refreshToken(req, res);
    }

    async googleCallback(req: Request, res: Response) {
        this.service.googleCallBack(req, res);
    }

    async register(req: Request, res: Response) {
        return this.service.registerUser(req, res);
    }

    async login(req: Request, res: Response) {
        return this.service.loginUser(req, res);
    }

    async logout(req: Request, res: Response) {
        return this.service.logout(req, res);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthController, 'authController', ['authService']);
});

export default init;