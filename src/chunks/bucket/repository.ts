import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";

export interface IBucketRepository {
    create: (body: IBucket) => Promise<Bucket>;
    update: (id: number, bucket: IBucket) => Promise<Response>;
    read: (id: number) => Promise<Bucket>;
    getList:(skip: number, limit: number) => Promise<IBucket[]>
    delete: (id: number) => Promise<void>;
}

export class BucketRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(bucket: IBucket): Promise<void> {
        return await this.manager().query(
            `
        INSERT INTO buckets (title, description, check, currency)
        VALUES ($1, $2, $3);
    `,
            [bucket.title, bucket.description, bucket.check, bucket.currency]
        )
    }

    async read(id: number): Promise<void> {
        return await this.manager().query(
            `
        SELECT * 
        FROM buckets
        WHERE id = $1
    `,
            [id]
        )
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

    async update(id: number, bucket : IBucket): Promise<void> {
        const res = await this.manager().query(
            `
        UPDATE buckets
        SET title=$1, defaultCurrency=$2
        WHERE id=$1
    `,
            [id, bucket.title, bucket.description]
        )
        return res;
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
}


const init = new Promise(() => {
    InjectableContainer.setDependency(BucketRepository, 'bucketRepository', ['getManager']);
});

export default init;