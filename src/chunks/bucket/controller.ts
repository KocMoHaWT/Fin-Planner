import { CustomRequest } from "../../interfaces/request";
import { IBucketService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IBucketController {
    read: (req: Request, res: Response) => Promise<any>;
    getList: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
    update: (req: Request, res: Response) => Promise<any>;
    create: (req: Request, res: Response) => Promise<any>;
    getBucketTypeList: (req: Request, res: Response) => Promise<any>;
    getLogs: (req: CustomRequest, res: Response)  => Promise<any>;
    moneyTransfer: (req: CustomRequest, res: Response) => Promise<Response>
}

export class BucketController implements IBucketController {
  private service: IBucketService;

    constructor({ bucketService }: { bucketService: IBucketService }) {
        this.service = bucketService;
    }

    async create(req: CustomRequest, res: Response) {
        return this.service.create(req, res);
    }

    async delete(req: CustomRequest, res: Response) {
        return this.service.delete(req, res);
    }

    async getList(req: CustomRequest, res: Response) {
        return this.service.getList(req, res);
    }

    async read(req: CustomRequest, res: Response) {
        return this.service.read(req, res);
    }

    async update(req: CustomRequest, res: Response) {
        return this.service.update(req, res);
    }

    async getBucketTypeList(req: CustomRequest, res: Response) {
        console.log('qew',this.service);
        return this.service.getBucketTypeList(req, res);
    }

    async getLogs(req: CustomRequest, res: Response):Promise<any> {
        return this.service.getLogs(req, res);
    }

    async moneyTransfer(req: CustomRequest, res: Response):Promise<any> {
        return this.service.moneyTransfer(req, res);
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketController, 'bucketController', ['bucketService']);
});

export default init;