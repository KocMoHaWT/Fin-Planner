import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { IBucketType } from "../../interfaces/bucketType";
import { MovementDirection } from "../../interfaces/moneyMovementDirection";
import { Bucket, IBucket } from "./bucket";
import bucketFactory, { BucketData } from "./bucketFactory";

export interface IBucketRepository {
    create: (body: IBucket, userId: number) => Promise<BucketData>;
    update: (bucket: IBucket) => Promise<BucketData>;
    read: (id: number, userId: number) => Promise<BucketData>;
    getList: (userId: number, offset: number, limit: number) => Promise<IBucket[]>;
    delete: (id: number, userId: number) => Promise<void>;
    getBucketTypeList: (skip: number, limit: number) => Promise<IBucketType[]>;
    createActivityLog: (bucketId: number, incomeId: number, ammount: number, direction: MovementDirection) => Promise<void>
    getBucketTypeById: (id: number) => Promise<IBucketType>;
    setNewBucketTags: (bucketId: number, tags: string[]) => Promise<{ id: number, value: string }[]>;
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
        INSERT INTO buckets (title, description, ammount, user_id, date, period, bucket_type_id, linked_income_id, currency)
        VALUES ($1, $2, $3, $4, $5,$6,$7, $8, $9)
        RETURNING *;
    `,
            [bucket.title, bucket.description, bucket.ammount, userId, bucket.date, bucket.period, bucketTypeId, bucket?.linkedIncome, bucket.currency]
        )
        const newBucket = res.pop()
        return newBucket;
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

        if (newBucket) {
            return newBucket;
        }
        return null;
    }

    async setNewBucketTags(bucketId: number, tags: string[]) {
        await this.cleanBucketTags(bucketId);
        const existedTags = await this.getAlreadyExistedTags(tags);
        const onlyExistingValues = existedTags.map(el => el.value);
        const uniqueTags = tags.filter(tag => !onlyExistingValues.includes(tag));
        const newUniueTags = uniqueTags.length ? await this.addNewTags(uniqueTags) : [];
        const allTagsIds = [...newUniueTags.map(el => el.id), ...existedTags.map(el => el.id)]
        await this.manager().query(`
        INSERT INTO bucket_tags (bucket_id, tag)
        VALUES  ${allTagsIds.map((el, index) => `($1, $${index + 2})`)}
    `,
            [bucketId, ...allTagsIds]
        )
        const res = await this.getBucketTags(bucketId)
        return res;
    }

    async addNewTags(tags: string[]): Promise<{ id: number, value: string }[]> {
        const res = await this.manager().query(`
        INSERT INTO tags (value)
        VALUES ${tags.map((_, index) => `($${index + 1})`)}
        RETURNING *;
    `,
            [...tags]
        )

        return res;
    }

    async getAlreadyExistedTags(tags: string[]): Promise<{ id: number, value: string }[]> {
        return this.manager().query(`
        SELECT * 
        FROM tags
        WHERE value IN (${tags.map((_, index) => `$${index + 1}`)})
            `,
            [...tags]
        )
    }

    async cleanBucketTags(bucketId: number) {
        return this.manager().query(`
        DELETE
        FROM bucket_tags
        WHERE bucket_tags.bucket_id = $1

            `, [bucketId]);
    }

    async getBucketTags(id: number) {
        return this.manager().query(`
        SELECT tags.value
        FROM buckets
        LEFT JOIN bucket_tags ON bucket_tags.bucket_id = buckets.id
        LEFT JOIN tags ON bucket_tags.tag = tags.id
        WHERE  buckets.id = $1;
        `, [id]);
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
    async getList(userId: number, skip: number, limit: number): Promise<IBucket[]> {
        return await this.manager().query(
            `
        SELECT *
            FROM buckets
        WHERE user_id = $3
        LIMIT $1 OFFSET $2;

        `,
            [limit, skip, userId]
        )
    }

    async update(bucket: IBucket): Promise<BucketData> {
        const bucketTypeId = typeof bucket.bucketType === 'number' ? bucket.bucketType : bucket.bucketType.id;
        const res = await this.manager().query(
            `
        UPDATE buckets
        SET title = $2, description = $3, ammount = $4, date = $5, period = $6, bucket_type_id = $7, status = $8
        WHERE id = $1
        RETURNING *;
        `,
            [bucket.id, bucket.title, bucket.description, bucket.ammount, bucket.date, bucket.period, bucketTypeId, bucket.status]
        );
        let tags = [];
        if (bucket.tags) {
           tags = await this.setNewBucketTags(bucket.id, bucket.tags);
        }
        

        // res after db res [ [{}], 1 ] this question needs to be investigated
        const newBucket = res[0].pop();
        newBucket.tags = tags;
        if (newBucket) {
            return newBucket;
        }
        return null;
    }

    async delete(id: number, userId: number): Promise<void> {
        await this.manager().query(
            `
        DELETE
        FROM buckets
        WHERE id = $1 AND user_id = $2;
        `,
            [id, userId]
        );
        await this.cleanBucketTags(id);
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