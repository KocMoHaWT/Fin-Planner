import { IAuthService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthController {
    kek: (req: Request, res: Response ) => Promise<any>;
    googleCallback: (req: Request, res: Response) => Promise<void | Response>;
    register: (req: Request, res: Response) => Promise<any>;
    login: (req: Request, res: Response) => Promise<any>;
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

    async register(req: Request, res: Response) {
        console.log('qwe');
        const tokens = this.service.registerUser(req, res);
        return res.json({...tokens});
    }

    async login(req: Request, res: Response) {
        const tokens = this.service.loginUser(req, res);
        return res.json({...tokens});
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthController, 'authController', ['authService']);
});

export default init;