import { CustomRequest } from "../../interfaces/request";
import { ActivityLogRepository, IActivityLogRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { IActivityLog } from "../../interfaces/activityLog";

export interface IActivityLogService {
    getLogsByBucketId: (bucketId: number, userId: number) => Promise<IActivityLog[]>;
    createMoneyTransfer: (data: IActivityLog) => Promise<void>;
    getIncomeLogs: (incomeId: number, userId: number) => Promise<IActivityLog[]>;
}

export class ActivityLogService implements IActivityLogService {
    private repository: IActivityLogRepository;

    constructor({ activityLogRepository }: { activityLogRepository: IActivityLogRepository }) {
        this.repository = activityLogRepository;
    }

    async getLogsByBucketId(id: number, userId: number): Promise<IActivityLog[]>{
        return this.repository.getLogsByBucketId(id,userId);
    }

    async createMoneyTransfer(data: IActivityLog): Promise<void> {
        this.repository.create(data.bucketId, data.incomeId, data.ammount, data.direction);
    }

    async getIncomeLogs(id: number, userId: number): Promise<IActivityLog[]>{
        return this.repository.getLogsByIncomeId(id,userId);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(ActivityLogService, 'activityLogService', ['activityLogRepository']);
});

export default init;