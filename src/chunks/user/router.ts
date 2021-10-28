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
    constructor({ userController, commonPath = '', router = express.Router(), authService} : IUserRouter) {
        super(router, 'Authrouter', commonPath);
        this.userController = userController
        this.authService = authService;
    }

    configureRoutes() {
        this.router.get('/:id', [this.authService.middleware, this.userController.read.bind(this.userController)]);
        this.router.post('/', [this.userController.create.bind(this.userController)]);
        return this.router;
    }
}


InjectableContainer.setDependency(UserRouter, 'userRouter', ['userController', 'authService']);