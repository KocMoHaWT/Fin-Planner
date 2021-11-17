import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { Income, IIncome } from "./income";

export interface IIncomeRepository {
    create: (body: IIncome) => Promise<Income>;
    update: (id: number, bucket: IIncome) => Promise<Response>;
    read: (id: number) => Promise<Income>;
    getList:(skip: number, limit: number) => Promise<IIncome[]>
    delete: (id: number) => Promise<void>;
}

export class IncomeRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(bucket: IIncome): Promise<void> {
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
    async getList(skip: number = 0, limit: number = 50): Promise<IIncome[]> {
        return await this.manager().query(
            `
        SELECT * 
        FROM buckets
        LIMIT $1 OFFSET $2
    `,
            [limit, skip]
        )
    }

    async update(id: number, bucket : IIncome): Promise<void> {
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
    InjectableContainer.setDependency(IncomeRepository, 'bucketRepository', ['getManager']);
});

export default init;