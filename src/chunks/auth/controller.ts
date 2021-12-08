import { IAuthService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IAuthController {
    refreshToken: (req: Request, res: Response) => Promise<any>;
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
        const token = req.body.token;
        if (!token) {
            return res.status(401).end();
        }
        try {
            const tokens = await this.service.refreshToken(token);
            return res.status(200).json(tokens);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    // to implement full google auth
    async googleCallback(req: Request, res: Response) {
        this.service.googleCallBack(req, res);
    }

    async register(req: Request, res: Response) {
        try {
            const tokens = await this.service.registerUser(req.body);
            return res.status(200).json({ ...tokens });
        } catch (error) {
            return res.status(409).end();
        }
    }

    async login(req: Request, res: Response) {
        if (!req.body.email || !req.body.password) {
            return res.status(400);
        }
        try {
            const tokens = await this.service.loginUser(req.body.email, req.body.password);
            return res.status(201).json({
                ...tokens
            });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async logout(req: Request, res: Response) {
        return this.service.logout(req, res);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthController, 'authController', ['authService']);
});

export default init;