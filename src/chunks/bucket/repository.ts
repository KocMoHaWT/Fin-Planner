import { getManager } from "typeorm";

interface IBucketRepository {

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


    async getList(skip: number = 0, limit: number = 50): Promise<void> {
        return await this.manager().query(
            `
        SELECT * 
        FROM buckets
        LIMIT $1 OFFSET $2
    `,
            [limit, skip]
        )
    }

    async update(id: number): Promise<void> {
        return await this.manager().query(
            `
        SELECT * 
        FROM buckets
        WHERE id = $1
    `,
            [id]
        )
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