import { CustomRequest } from "../../interfaces/request";
import { BucketRepository, IBucketRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { Bucket } from "./bucket";

export interface IBucketService {
    create: (req: CustomRequest, res: Response) => Promise<Response>;
    update: (req: CustomRequest, res: Response) => Promise<Response>;
    getList: (req: CustomRequest, res: Response) => Promise<Response>;
    read: (req: CustomRequest, res: Response) => Promise<Response>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
}

export class BucketService implements IBucketService {
    private repository: IBucketRepository;

    constructor({ bucketRepository }: { bucketRepository: IBucketRepository }) {
        this.repository = bucketRepository;
    }

    async create(req: CustomRequest, res: Response): Promise<Response> {
        const data = new Bucket(req.body)
        const newBucket =  await this.repository.create(data.toJSON());
        return res.status(200).json({ bucket: newBucket.toJSON()});
    }

    async update(req: CustomRequest, res: Response): Promise<Response> {
        const bucket = new Bucket(req.body)
        return res.status(200).json({...bucket});
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        await this.repository.delete(+req.params.id);
        return res.status(200).end();
    }

    async read(req: CustomRequest, res: Response): Promise<Response>  {
        const bucket = await this.repository.read(+req.params.id);
        return res.status(200).json({...bucket});
    }

    async getList(req: CustomRequest, res: Response): Promise<Response>  {
        const buckets = await this.repository.getList(+req.params.offset, +req.params.limit);
        return res.status(200).json(buckets);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(BucketService, 'bucketService', ['bucketRepository']);
});

export default init;