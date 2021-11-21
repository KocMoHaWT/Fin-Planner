import { CustomRequest } from "../../interfaces/request";
import { BucketRepository, IBucketRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { Bucket } from "./bucket";
import { IBucketType } from "../../interfaces/bucketType";

export interface IBucketService {
    create: (req: CustomRequest, res: Response) => Promise<Response>;
    update: (req: CustomRequest, res: Response) => Promise<Response>;
    getList: (req: CustomRequest, res: Response) => Promise<Response>;
    read: (req: CustomRequest, res: Response) => Promise<Response>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
    getBucketTypeList: (req: CustomRequest, res: Response) => Promise<Response<IBucketType[]>>;
}

export class BucketService implements IBucketService {
    private repository: IBucketRepository;

    constructor({ bucketRepository }: { bucketRepository: IBucketRepository }) {
        this.repository = bucketRepository;
    }

    async create(req: CustomRequest, res: Response): Promise<Response> {
        const data = new Bucket(req.body)
        const newBucket =  await this.repository.create(data.toJSON(), req.user.id);
        return res.status(200).json({ bucket: newBucket.toJSON()});
    }

    async update(req: CustomRequest, res: Response): Promise<Response> {
        const oldBucket = await this.repository.read(+req.params.id, req.user.id);
        oldBucket.set(req.body);
        const newBucket = await this.repository.update(oldBucket);
        return res.status(200).json({...newBucket});
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        console.log('req',req.params.id);
        await this.repository.delete(+req.params.id, req.user.id);
        return res.status(200).end();
    }

    async read(req: CustomRequest, res: Response): Promise<Response>  {
        const bucket = await this.repository.read(+req.params.id, req.user.id);
        return res.status(200).json({...bucket});
    }

    async getList(req: CustomRequest, res: Response): Promise<Response>  {
        const buckets = await this.repository.getList(+req.params.offset, +req.params.limit);
        return res.status(200).json(buckets);
    }

    async getBucketTypeList(req: CustomRequest, res: Response): Promise<Response<IBucketType[]>>  {
        const buckets = await this.repository.getBucketTypeList(+req.params.offset || 0, +req.params.limit || 50);
        return res.status(200).json(buckets);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(BucketService, 'bucketService', ['bucketRepository']);
});

export default init;