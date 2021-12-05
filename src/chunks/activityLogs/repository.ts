import { getManager } from "typeorm";
import DefaultRepository from "../../application/DefaultRepository";
import InjectableContainer from "../../application/InjectableContainer";
import { IActivityLog } from "../../interfaces/activityLog";
import { MovementDirection } from "../../interfaces/moneyMovementDirection";

export interface IActivityLogRepository {
    create: (data: IActivityLog, connection?: any) => Promise<void>
    getLogsByBucketId: (id: number, userId: number) => Promise<IActivityLog[]>;
    getLogsByIncomeId: (id: number, userId: number) => Promise<IActivityLog[]>;
}

export class ActivityLogRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create({ bucketId, incomeId, ammount, direction, currencyValue, start_currency, end_currency }:IActivityLog, connection: any = undefined): Promise<void> {
        await this.manager(connection).query(
            `
                INSERT INTO activity_logs (ammount, direction, bucket_id, income_id, currency_value, start_currency, end_currency)
                VALUES ($1, $2, $3, $4, $5, $6, $7);
            `, [ammount, direction, bucketId, incomeId, currencyValue, start_currency, end_currency]
        )
    }

    async getLogsByBucketId(bucketId: number): Promise<IActivityLog[]> {
        const res = await this.manager().query(
            `
        SELECT bucket_id, income_id, ammount, direction, start_currency as "starCurrency", end_currency as "endCurrency"  FROM activity_logs
        WHERE bucket_id = $1;
    `,
            [bucketId]
        )

        console.log('res', res);
        return res;
    }


    async getLogsByIncomeId(incomeId: number): Promise<IActivityLog[]> {
        const res = await this.manager().query(
            `
        SELECT * FROM activity_logs 
        WHERE income_id = $1;
    `,
            [incomeId]
        )
        console.log('res',res);
        return res;
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(ActivityLogRepository, 'activityLogRepository', ['manager']);
});

export default init;