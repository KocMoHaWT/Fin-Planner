import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { IActivityLog } from "../../interfaces/activityLog";
import { MovementDirection } from "../../interfaces/moneyMovementDirection";

export interface IActivityLogRepository {
    create: (bucketId: number, incomeId: number, ammount: number, direction: MovementDirection) => Promise<void>
    getLogsByBucketId: (id: number, userId: number) => Promise<IActivityLog[]>;
    getLogsByIncomeId: (id: number, userId: number) => Promise<IActivityLog[]>;
}

export class ActivityLogRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(bucketId: number, incomeId: number, ammount: number, direction: MovementDirection): Promise<void> {
        await this.manager().query(
            `
                INSERT INTO activity_logs (ammount, direction, bucket_log_id, income_log_id)
                VALUES ($1, $2, $3, $4);
            `, [ammount, direction, bucketId, incomeId]
        )
    }

    async getLogsByBucketId(bucketId: number): Promise<any[]> {
        const res = await this.manager().query(
            `
        SELECT bucket_log_id, income_log_id, ammount, direction  FROM activity_logs
        WHERE bucket_log_id = $1;
    `,
            [bucketId]
        )

        console.log('res', res);
        return res;
    }    


    async getLogsByIncometId(incomeId: number, userId: number): Promise<any []> {
        const res = await this.manager().query(
            `
        SELECT * FROM activity_logs 
        WHERE user_id = $2 AND income_id = $1
    `,
            [incomeId, userId]
        )

        return res;
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(ActivityLogRepository, 'activityLogRepository', ['manager']);
});

export default init;