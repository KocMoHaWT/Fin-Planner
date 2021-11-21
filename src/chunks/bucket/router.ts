import * as express from 'express';
import InjectableContainer from '../../application/InjectableContainer';
import { CommonRoutesConfig } from '../../commonRoutesConfig';
import { IAuthService } from '../auth/service';
import { IBucketController } from './controller';
import { IBucketService } from './service';

interface IBucketRouter {
    bucketController: IBucketController;
    router?: express.Router;
    localMiddlewares?: [];
    commonPath: string;
    authService: IAuthService;
}

export class BucketRouter extends CommonRoutesConfig {
    private bucketController: IBucketController;
    private authService: IAuthService;
    constructor({ bucketController, commonPath = '/buckets', router = express.Router(), authService} : IBucketRouter) {
        super(router, 'BucketRouter', commonPath);
        this.bucketController = bucketController
        this.authService = authService;
    }

    configureRoutes() {
        this.router.post('/', [this.authService.middleware.bind(this.authService), this.bucketController.create.bind(this.bucketController)]);
        this.router.post('/update/:id', [this.authService.middleware.bind(this.authService), this.bucketController.update.bind(this.bucketController)]);
        this.router.get('/types/', [this.authService.middleware.bind(this.authService), this.bucketController.getBucketTypeList.bind(this.bucketController)]);
        this.router.delete('/:id', [this.authService.middleware.bind(this.authService), this.bucketController.delete.bind(this.bucketController)]);
        this.router.get('/:id', [this.authService.middleware.bind(this.authService), this.bucketController.read.bind(this.bucketController)]);
        this.router.get('/:offset/:limit', [this.authService.middleware.bind(this.authService), this.bucketController.read.bind(this.bucketController)]);
        return this.router;
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketRouter, 'bucketRouter', ['bucketController', 'authService']);
});

export default init;