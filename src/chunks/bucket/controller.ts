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
        const bucket = await this.service.create(req.body, req.user.toJSON());
        return res.status(200).json({ bucket });
    }

    async delete(req: CustomRequest, res: Response) {
        await this.service.delete(+req.params.id, req.user.id);
        return res.status(200).end();
    }

    async getList(req: CustomRequest, res: Response) {
        const buckets = await this.service.getList(req.user.id, +req.query.offset, +req.query.limit);
        return res.status(200).json(buckets);
    }

    async read(req: CustomRequest, res: Response) {
        const bucket = await this.service.read(+req.params.id, +req.user.id);
        return res.status(200).json({ ...bucket });
    }

    async update(req: CustomRequest, res: Response) {
        const bucket = await this.service.update(+req.params.id, req.user.id, req.body);
        return res.status(200).json({ ...bucket });
    }

    async getBucketTypeList(req: CustomRequest, res: Response) {
        const buckets = await this.service.getBucketTypeList(+req.body.offset, +req.body.limit);
        return res.status(200).json(buckets);
    }

    async getLogs(req: CustomRequest, res: Response):Promise<any> {
        const logs = await this.service.getLogs(+req.params.id, req.user.id);
        return res.status(200).json(logs);
    }

    async moneyTransfer(req: CustomRequest, res: Response):Promise<any> {
        await this.service.moneyTransfer(req.user.id, req.body);
        return res.status(200).json();
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(BucketController, 'bucketController', ['bucketService']);
});

export default init;