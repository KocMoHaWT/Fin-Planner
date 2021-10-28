import * as express from 'express';
import InjectableContainer from '../../application/InjectableContainer';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { AuthController, IAuthController } from './controller';

interface IAuthRouter {
    authController: IAuthController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string
}

export class AuthRouter extends CommonRoutesConfig {
    private controller: IAuthController;
    constructor({ authController, commonPath =  '', router = express.Router()} : IAuthRouter) {
        super(router, 'Authrouter', commonPath);
        this.controller = authController
    }

    configureRoutes() {
        this.router.get('/', [this.controller.kek.bind(this.controller)])
        return this.router;
    }
}

InjectableContainer.setDependency(AuthRouter, 'authRouter', ['authController']);
