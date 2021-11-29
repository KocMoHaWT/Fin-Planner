import { CustomRequest } from "../../interfaces/request";
import { ActivityLogRepository, IActivityLogRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { IActivityLog } from "../../interfaces/activityLog";
import { ICurrencyService } from "../currency/service";
import { MovementDirection } from "../../interfaces/moneyMovementDirection";

export interface IActivityLogService {
    getLogsByBucketId: (bucketId: number, userId: number) => Promise<IActivityLog[]>;
    createMoneyTransfer: (data: IActivityLog, bucketCurrency: string, incomeCurrency: string) => Promise<void>;
    getIncomeLogs: (incomeId: number, userId: number) => Promise<IActivityLog[]>;
}

export class ActivityLogService implements IActivityLogService {
    private repository: IActivityLogRepository;
    private currencyService: ICurrencyService;

    constructor({ activityLogRepository, currencyService }: { currencyService: ICurrencyService, activityLogRepository: IActivityLogRepository }) {
        this.repository = activityLogRepository;
        this.currencyService = currencyService;
    }

    async getLogsByBucketId(id: number, userId: number): Promise<IActivityLog[]> {
        return this.repository.getLogsByBucketId(id, userId);
    }

    async createMoneyTransfer(data: IActivityLog, bucketCurrency: string, incomeCurrency: string): Promise<void> {
        const [start_currency, end_currency] = data.direction === MovementDirection.spent ? [incomeCurrency, bucketCurrency] : [bucketCurrency, incomeCurrency]
        console.log(start_currency, end_currency);
        const currencyValue = await this.currencyService.getCurrenctCurrencyValue(start_currency, end_currency);
        console.log('currencyValue',currencyValue);
        this.repository.create({...data, currencyValue, start_currency, end_currency });
    }

    async getIncomeLogs(id: number, userId: number): Promise<IActivityLog[]> {
        return this.repository.getLogsByIncomeId(id, userId);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(ActivityLogService, 'activityLogService', ['activityLogRepository', 'currencyService']);
});

export default init;