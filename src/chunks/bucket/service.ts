import { CustomRequest } from "../../interfaces/request";
import { IBucketRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { Bucket, IBucket } from "./bucket";
import { IBucketType } from "../../interfaces/bucketType";
import { IActivityLogService } from "../activityLogs/service";
import bucketFactory from "./bucketFactory";
import { IIncomeService } from "../income/service";
import { IActivityLog } from "../../interfaces/activityLog";
import { IUser } from "../user/user";

export interface IBucketService {
    create: (bucketData: IBucket, user: IUser) => Promise<IBucket>;
    update: (bucketId: number, userId: number, data: Partial<IBucket>) => Promise<IBucket>;
    read: (bucketId: number, userId: number) => Promise<IBucket>;
    delete: (bucketId: number, userId: number) => Promise<void>;
    getList: (userId: number, offset: number, limit: number) => Promise<IBucket[]>;
    getBucketTypeList: (offset: number, limit: number) => Promise<IBucketType[]>;
    getLogs: (bucketId: number, userId: number) => Promise<IActivityLog[]>;
    moneyTransfer: (userId: number, body: IActivityLog) => Promise<void>;
}

export class BucketService implements IBucketService {
    private repository: IBucketRepository;
    private activityLogService: IActivityLogService;
    private incomeService: IIncomeService;

    constructor({ bucketRepository, activityLogService, incomeService }: { incomeService: IIncomeService, bucketRepository: IBucketRepository, activityLogService: IActivityLogService }) {
        this.repository = bucketRepository;
        this.activityLogService = activityLogService;
        this.incomeService = incomeService;
    }

    async create(bucketData: IBucket, user: IUser): Promise<IBucket> {
        const data = new Bucket(bucketData, user?.defaultCurrency)
        const newBucket = await this.repository.create(data.toJSON(), user.id);
        const bucket = bucketFactory.createFromDb({ dbBucketData: newBucket, bucketType: null })
        return bucket.toJSON()
    }

    async update(bucketId: number, userId: number, data: Partial<IBucket>): Promise<IBucket> {
        const oldBucket = await this.repository.read(bucketId, userId);
        const bucket = bucketFactory.createFromDb({ dbBucketData: oldBucket, bucketType: {} as any });
        bucket.set(data);
        const newResult = await this.repository.update(bucket);
        const logs = await this.activityLogService.getLogsByBucketId(bucketId, userId);
        const bucketType = await this.repository.getBucketTypeById(bucketId);
        const newBucket = bucketFactory.createFromDb({ dbBucketData: newResult, bucketType, logs });
        return newBucket.toJSON();
    }

    async delete(bucketId: number, userId: number): Promise<void> {
        await this.repository.delete(bucketId, userId);
    }

    async read(bucketId: number, userId: number): Promise<IBucket> {
        const bucket = await this.repository.read(bucketId, userId);
        const bucketType = await this.repository.getBucketTypeById(bucketId);
        const logs = await this.activityLogService.getLogsByBucketId(bucketId, userId);
        const fullBucket = bucketFactory.createFromDb({ dbBucketData: bucket, bucketType, logs });
        return fullBucket.toJSON();
    }

    async getBucket(bucketId: number, userId: number): Promise<IBucket> {
        const bucket = await this.repository.read(bucketId, userId);
        const fullBucket = bucketFactory.createFromDb({ dbBucketData: bucket, bucketType: null, logs: null });
        return fullBucket.toJSON();
    }
    async getList(userId: number, offset: number = 0,limit: number = 10): Promise<IBucket[]> {
        offset = Number.isInteger(offset) ? offset : 0;
        limit = Number.isInteger(limit) ? limit : 10;
        const buckets = await this.repository.getList(userId, offset, limit);
       return buckets;
    }

    async getBucketTypeList(offset: number, limit: number): Promise<IBucketType[]> {
        const bucketTypes = await this.repository.getBucketTypeList(offset || 0, limit || 50);
        return bucketTypes;
    }

    async getLogs(bucketId: number, userId: number): Promise<IActivityLog[]> {
        return this.activityLogService.getLogsByBucketId(bucketId, userId);
    }

    async moneyTransfer(userId: number, body: IActivityLog): Promise<void> {
        const bucket = await this.getBucket(body.bucketId, userId);
        const income = await this.incomeService.read(body.incomeId, userId);
        await this.activityLogService.createMoneyTransfer(body, bucket.currency, income.currency);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(BucketService, 'bucketService', ['bucketRepository', 'activityLogService', 'incomeService']);
});

export default init;