import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { IBucketType } from "../../interfaces/bucketType";
import { MovementDirection } from "../../interfaces/moneyMovementDirection";
import { Bucket, IBucket } from "./bucket";
import bucketFactory from "./bucketFactory";

export interface IBucketRepository {
    create: (body: IBucket, userId: number) => Promise<Bucket>;
    update: (bucket: IBucket) => Promise<Response>;
    read: (id: number, userId: number) => Promise<Bucket>;
    getList: (skip: number, limit: number) => Promise<IBucket[]>;
    delete: (id: number, userId: number) => Promise<void>;
    getBucketTypeList: (skip: number, limit: number) => Promise<IBucketType[]>;
    createActivityLog: (bucketId: number, incomeId: number, ammount: number, direction: MovementDirection) => Promise<void>
    getLogsByBucketId: (id: number, userId: number) => Promise<any[]>;
}

export class BucketRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(bucket: IBucket, userId: number): Promise<IBucket> {
        const bucketTypeId = typeof bucket.bucketType === 'number' ? bucket.bucketType : bucket.bucketType.id;
        const res = await this.manager().query(
            `
        INSERT INTO buckets (title, description, ammount, user_id, tags, date, period, bucket_type_id, linked_income_id)
        VALUES ($1, $2, $3, $4, $5,$6,$7, $8, $9)
        RETURNING *;
    `,
            [bucket.title, bucket.description, bucket.ammount, userId, bucket.tags, bucket.date, bucket.period, bucketTypeId, bucket.linkedIncome]
        )
        const newBucket = res.pop()
        return bucketFactory.createFromDb({ dbBucketData: newBucket, bucketType: {} as any });
    }

    async read(id: number, userId: number): Promise<IBucket> {
        const res = await this.manager().query(
            `
        SELECT * 
        FROM buckets
        WHERE id = $1 AND user_id = $2
    `,
            [id, userId]
        )

        const newBucket = res.pop()
        const typeData = await this.getBucketTypeById(newBucket?.bucket_type_id)
        const logs = await this.getLogsByBucketId(newBucket.id);
        if (newBucket) {
            const test = bucketFactory.createFromDb({ dbBucketData: newBucket, bucketType: typeData, logs });
            return test;
        }
        return null;
    }

    async getBucketTypeById(id: number) {
        const res = await this.manager().query(`
        SELECT * 
        FROM bucket_types
        WHERE id = $1
    `,
            [id]
        )
        if (res.length) {
            return res.pop();
        }
        return null;
    }

    ///  change to better 
    async getList(skip: number = 0, limit: number = 50): Promise<IBucket[]> {
        return await this.manager().query(
            `
        SELECT * 
        FROM buckets
        LIMIT $1 OFFSET $2
    `,
            [limit, skip]
        )
    }

    async update(bucket: IBucket): Promise<IBucket> {
        const bucketTypeId = typeof bucket.bucketType === 'number' ? bucket.bucketType : bucket.bucketType.id;
        const res = await this.manager().query(
            `
        UPDATE buckets
        SET title=$2, description=$3, ammount=$4, tags=$5, date=$6, period=$7, bucket_type_id=$8
        WHERE id=$1
        RETURNING *;
    `,
            [bucket.id, bucket.title, bucket.description, bucket.ammount, bucket.tags, bucket.date, bucket.period, bucketTypeId]
        );

        // res after db res [ [{}], 1 ] this question needs to be investigated
        const newBucket = res[0].pop();
        const bucketType = await this.getBucketTypeById(newBucket?.bucket_type_id);
        const logs = await this.getLogsByBucketId(newBucket.id);
        if (newBucket) {
            const test = bucketFactory.createFromDb({ dbBucketData: newBucket, bucketType, logs });
            return test;
        }
        return null;
    }

    async delete(id: number, userId: number): Promise<void> {
        return await this.manager().query(
            `
        DELETE 
        FROM buckets
        WHERE id = $1 AND user_id = $2;
    `,
            [id, userId]
        )
    }

    async getBucketTypeList(skip: number = 0, limit: number = 50): Promise<IBucketType[]> {
        return await this.manager().query(
            `
        SELECT * 
        FROM bucket_types
        LIMIT $1 OFFSET $2;
    `,
            [limit, skip]
        )
    }


    /// activityLog 
    async createActivityLog(bucketId: number, incomeId: number, ammount: number, direction: MovementDirection): Promise<void> {
        await this.manager().transaction(async manager => {
            const res = await manager.query(
                `
            INSERT INTO activity_logs (ammount, direction)
            VALUES ($1, $2)
            RETURNING *;
        `,
                [ammount, direction]
            )

            await manager.query(
                `
            INSERT INTO bucket_logs (bucket_id, activity_log)
            VALUES ($1, $2);
        `,
                [bucketId, res[0].id]
            )
            await manager.query(
                `
            INSERT INTO income_logs (income_id,activity_log)
            VALUES ($1, $2);
        `,
                [incomeId, res[0].id]
            )
        })
    }

    async getLogsByBucketId(bucketId: number): Promise<any[]> {
        const res = await this.manager().query(
            `
        SELECT bucket_id, income_id, ammount, direction  FROM activity_logs
        LEFT JOIN bucket_logs 
        ON bucket_logs.activity_log = activity_logs.id
        LEFT JOIN income_logs 
        ON income_logs.activity_log = activity_logs.id
        WHERE bucket_id = $1
    `,
            [bucketId]
        )

        console.log('res', res);
        return res;
    }

}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketRepository, 'bucketRepository', ['manager']);
});

export default init;