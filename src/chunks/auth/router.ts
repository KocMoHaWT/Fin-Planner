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
    constructor({ authController, commonPath =  '/auth', router = express.Router()} : IAuthRouter) {
        super(router, 'Authrouter', commonPath);
        this.controller = authController;
    }

    configureRoutes() {
        this.router.post('/register', [this.controller.register.bind(this.controller)]);
        this.router.post('/login', [this.controller.login.bind(this.controller)]);
        this.router.post('/refresh', [this.controller.refreshToken.bind(this.controller)]);
        return this.router;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthRouter, 'authRouter', ['authController']);
});

export default init;