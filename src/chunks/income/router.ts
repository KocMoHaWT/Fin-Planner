import * as express from 'express';
import InjectableContainer from '../../application/InjectableContainer';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { IAuthService } from '../auth/service';
import { IIncomeController } from './controller';

interface IUserRouter {
    incomeController: IIncomeController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string;
    authService: IAuthService;
}

export class IncomeRouter extends CommonRoutesConfig {
    private incomeController: IIncomeController;
    private authService: IAuthService;
    constructor({ incomeController, commonPath = '/incomes', router = express.Router(), authService} : IUserRouter) {
        super(router, 'IncomeRouter', commonPath);
        this.incomeController = incomeController
        this.authService = authService;
    }

    configureRoutes() {
        this.router.use(this.authService.middleware.bind(this.authService));
        this.router.post('/', [this.incomeController.create.bind(this.incomeController)]);
        this.router.post('/:id/update', [this.incomeController.update.bind(this.incomeController)]);
        this.router.delete('/:id', [this.incomeController.delete.bind(this.incomeController)]);
        this.router.get('list', [this.incomeController.getList.bind(this.incomeController)]);
        this.router.get('/:id', [this.incomeController.read.bind(this.incomeController)]);
        return this.router;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeRouter, 'incomeRouter', ['incomeController', 'authService']);
});

export default init;