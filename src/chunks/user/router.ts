import * as express from 'express';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { IUserController } from './controller';

interface IUserRouter {
    controller: IUserController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string
}

export class UserRouter extends CommonRoutesConfig {
    private controller: IUserController;
    constructor({ controller, commonPath = '', router = express.Router()} : IUserRouter) {
        super(router, 'Authrouter', commonPath);
        this.controller = controller
    }

    configureRoutes() {
        this.router.get('/:id', [this.controller.read.bind(this.controller)]);
        this.router.post('/', [this.controller.create.bind(this.controller)]);
        return this.router;
    }
}
