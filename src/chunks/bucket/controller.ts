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
}

export class BucketController implements IBucketController {
  private service: IBucketService;

    constructor({ userService }: { userService: IBucketService }) {
        this.service = userService;
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
}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketController, 'bucketController', ['bucketService']);
});

export default init;