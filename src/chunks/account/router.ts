import * as express from 'express';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { IAccountController } from './controller';

interface IAccountRouter {
    controller: IAccountController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string
}

export class AccountRouter extends CommonRoutesConfig {
    private controller: IAccountController;
    constructor({ controller, commonPath =  '', router = express.Router()} : IAccountRouter) {
        super(router, 'Authrouter', commonPath);
        this.controller = controller
    }

    configureRoutes() {
        this.router.get('/', [this.controller.read.bind(this.controller)])
        return this.router;
    }
}
