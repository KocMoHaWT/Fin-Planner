import * as express from 'express';
import InjectableContainer from '../../application/InjectableContainer';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { IAuthService } from '../auth/service';
import { IUserController } from './controller';

interface IUserRouter {
    userController: IUserController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string;
    authService: IAuthService;
}

export class UserRouter extends CommonRoutesConfig {
    private userController: IUserController;
    private authService: IAuthService;
    constructor({ userController, commonPath = '/users', router = express.Router(), authService} : IUserRouter) {
        super(router, 'Authrouter', commonPath);
        this.userController = userController
        this.authService = authService;
    }

    configureRoutes() {
        this.router.get('/', [this.authService.middleware.bind(this.authService), this.userController.read.bind(this.userController)]);
        return this.router;
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(UserRouter, 'userRouter', ['userController', 'authService']);
});

export default init;