import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { IBucketType } from "../../interfaces/bucketType";
import { Bucket, IBucket } from "./bucket";
import bucketFactory from "./bucketFactory";

export interface IBucketRepository {
    create: (body: IBucket, userId: number) => Promise<Bucket>;
    update: (id: number, bucket: IBucket) => Promise<Response>;
    read: (id: number) => Promise<Bucket>;
    getList: (skip: number, limit: number) => Promise<IBucket[]>;
    delete: (id: number) => Promise<void>;
    getBucketTypeList: (skip: number, limit: number) => Promise<IBucketType[]>;
}

export class BucketRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(bucket: IBucket, userId: number): Promise<IBucket> {
        const res = await this.manager().query(
            `
        INSERT INTO buckets (title, description, ammount, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
            [bucket.title, bucket.description, bucket.ammount, userId]
        )
        const newBucket = res.pop()
        console.log('===>', newBucket);
        return bucketFactory.createFromDb({dbBucketData: newBucket, bucketType: {} as any});
    }

    async read(id: number): Promise<IBucket> {
        const res = await this.manager().query(
            `
        SELECT * 
        FROM buckets
        WHERE id = $1
    `,
            [id]
        )

        if (res.length) {
            return bucketFactory.createFromDb(res.pop());
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

    async update(id: number, bucket: IBucket): Promise<IBucket> {
        const res = await this.manager().query(
            `
        UPDATE buckets
        SET title=$1, defaultCurrency=$2
        WHERE id=$1
    `,
            [id, bucket.title, bucket.description]
        )
        if (res.length) {
            return bucketFactory.createFromDb(res.pop());
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        return await this.manager().query(
            `
        DELETE 
        FROM buckets
        WHERE id = $1
    `,
            [id]
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

}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketRepository, 'bucketRepository', ['manager']);
});

export default init;