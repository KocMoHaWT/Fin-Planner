import { getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { Income, IIncome } from "./income";

export interface IIncomeRepository {
    create: (body: IIncome, userId: number) => Promise<Income>;
    update: (income: IIncome) => Promise<Income>;
    read: (id: number, userId: number) => Promise<Income>;
    getList: (id: number, skip: number, limit: number, ) => Promise<IIncome[]>
    delete: (id: number, userId: number) => Promise<void>;
}

export class IncomeRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(income: IIncome, userId: number): Promise<IIncome> {
        const res = await this.manager().query(
            `
        INSERT INTO incomes (title, ammount, currency, date, regular, user_id)
        VALUES ($1, $2, $3,$4,$5, $6)
        RETURNING *;
    `,
            [income.title, income.ammount, income.currency, income.date, income.regular, userId]
        );
        const dbIncome = res.pop();
        if (dbIncome) {
            const income = new Income(dbIncome);
            return income;
        }
        return null;
    }

    async read(id: number, userId: number): Promise<IIncome> {
        const res = await this.manager().query(
            `
        SELECT * 
        FROM incomes
        WHERE id = $1 AND user_id = $2
    `,
            [id, userId]
        )
        const dbIncome = res.pop();
        if (dbIncome) {
            const test = new Income(dbIncome);
            return test;
        }
        return null;
    }

    async getList(id: number, skip: number = 0, limit: number = 50, ): Promise<IIncome[]> {
        return await this.manager().query(
            `
        SELECT * 
        FROM incomes
        LIMIT $1 OFFSET $2
        WHERE user_id = $3
    `,
            [limit, skip, id]
        )
    }

    async update(income: IIncome): Promise<IIncome> {
        const res = await this.manager().query(
            `
        UPDATE incomes
        SET title=$2, ammount=$3, date=$4, regular=$5
        WHERE id=$1
        RETURNING *;
    `,
            [income.id, income.title, income.ammount, income.date, income.regular]
        )
         // res after db res [ [{}], 1 ] this question needs to be investigated
         const newIncome = res[0].pop();
         if (newIncome) {
             return new Income(newIncome)
         }
         return null;
    }

    async delete(id: number, userId: number): Promise<void> {
        return await this.manager().query(
            `
        DELETE 
        FROM incomes
        WHERE id = $1 AND user_id = $2
    `,
            [id, userId]
        )
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeRepository, 'incomeRepository', ['manager']);
});

export default init;