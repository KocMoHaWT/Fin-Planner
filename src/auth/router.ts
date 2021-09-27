import * as express from 'express';
import { CommonRoutesConfig } from '../commonRoutesConfig';
import { AuthController, IAuthController } from './controller';

interface IAuthRouter {
    controller: IAuthController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string
}

export class AuthRouter extends CommonRoutesConfig {
    private controller: IAuthController;
    constructor({ controller, commonPath =  '', router = express.Router()} : IAuthRouter) {
        super(router, 'Authrouter', commonPath);
        this.controller = controller
    }

    configureRoutes() {
        this.router.get('/', [this.controller.kek])
        return this.router;
    }

}
