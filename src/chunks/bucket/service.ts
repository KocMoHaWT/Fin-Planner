import { CustomRequest } from "../../interfaces/request";
import { BucketRepository, IBucketRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { Bucket } from "./bucket";
import { IBucketType } from "../../interfaces/bucketType";
import { IActivityLogRepository } from "../activityLogs/repository";
import { IActivityLogService } from "../activityLogs/service";
import bucketFactory from "./bucketFactory";

export interface IBucketService {
    create: (req: CustomRequest, res: Response) => Promise<Response>;
    update: (req: CustomRequest, res: Response) => Promise<Response>;
    getList: (req: CustomRequest, res: Response) => Promise<Response>;
    read: (req: CustomRequest, res: Response) => Promise<Response>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
    getBucketTypeList: (req: CustomRequest, res: Response) => Promise<Response<IBucketType[]>>;
    getLogs: (req: CustomRequest, res: Response) => Promise<Response>;
    moneyTransfer: (req: CustomRequest, res: Response) => Promise<Response>;
}

export class BucketService implements IBucketService {
    private repository: IBucketRepository;
    private activityLogService: IActivityLogService;

    constructor({ bucketRepository, activityLogService }: { bucketRepository: IBucketRepository, activityLogService: IActivityLogService }) {
        this.repository = bucketRepository;
        this.activityLogService = activityLogService;
    }

    async create(req: CustomRequest, res: Response): Promise<Response> {
        const data = new Bucket(req.body)
        const newBucket = await this.repository.create(data.toJSON(), req.user.id);
        const bucket = bucketFactory.createFromDb({ dbBucketData: newBucket, bucketType: {} as any })
        return res.status(200).json({ bucket: bucket.toJSON() });
    }

    async update(req: CustomRequest, res: Response): Promise<Response> {
        const oldBucket = await this.repository.read(+req.params.id, req.user.id);
        const bucket = bucketFactory.createFromDb({ dbBucketData: oldBucket, bucketType: {} as any });
        bucket.set(req.body);
        const newResult = await this.repository.update(bucket);
        const logs = await this.activityLogService.getLogsByBucketId(+req.params.id, req.user.id);
        const bucketType = await this.repository.getBucketTypeById(+req.params.id);
        const newBucket = bucketFactory.createFromDb({ dbBucketData: newResult, bucketType, logs });
        return res.status(200).json({ ...newBucket });
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        await this.repository.delete(+req.params.id, req.user.id);
        return res.status(200).end();
    }

    async read(req: CustomRequest, res: Response): Promise<Response> {
        const oldBucket = await this.repository.read(+req.params.id, req.user.id);
        const bucketType = await this.repository.getBucketTypeById(+req.params.id);
        const logs = await this.activityLogService.getLogsByBucketId(+req.params.id, req.user.id);
        const bucket = bucketFactory.createFromDb({ dbBucketData: oldBucket, bucketType, logs });
        return res.status(200).json({ ...bucket });
    }

    async getList(req: CustomRequest, res: Response): Promise<Response> {
        const buckets = await this.repository.getList(+req.params.offset, +req.params.limit);
        return res.status(200).json(buckets);
    }

    async getBucketTypeList(req: CustomRequest, res: Response): Promise<Response<IBucketType[]>> {
        const buckets = await this.repository.getBucketTypeList(+req.params.offset || 0, +req.params.limit || 50);
        return res.status(200).json(buckets);
    }

    async getLogs(req: CustomRequest, res: Response): Promise<Response> {
        const logs = await this.activityLogService.getLogsByBucketId(+req.params.id, req.user.id);
        return res.status(200).json(logs);
    }

    async moneyTransfer(req: CustomRequest, res: Response): Promise<Response> {
        await this.activityLogService.createMoneyTransfer(req.body);
        return res.status(200).json();
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(BucketService, 'bucketService', ['bucketRepository', 'activityLogService']);
});

export default init;