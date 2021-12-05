import { CustomRequest } from "../../interfaces/request";
import { IIncomeRepository } from "./repository";
import { Response } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { IIncome, Income } from "./income";
import User from "../user/user";

export interface IIncomeService {
    create: (body: IIncome, user: User) => Promise<Income>;
    update: (incomeId: number, user: User, body: IIncome) => Promise<Income>;
    getList: (userId: number, offset?: number, limit?: number) => Promise<IIncome[]>;
    read: (id: number, userId: number) => Promise<Income>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
}

export class IncomeService implements IIncomeService {
    private repository: IIncomeRepository;

    constructor({ incomeRepository }: { incomeRepository: IIncomeRepository }) {
        this.repository = incomeRepository;
    }

    async create(body: IIncome, user: User): Promise<Income> {
        const data = new Income(body, user.defaultCurrency);
        const newIncome =  await this.repository.create(data.toJSON(), user.id);
       return newIncome;
    }

    async update(incomeId: number, user: User, body: IIncome): Promise<Income> {
        const oldIncome = await this.repository.read(incomeId, user.id);
        oldIncome.set(body);
        return this.repository.update(oldIncome);   
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        await this.repository.delete(+req.params.id, req.user.id);
    }

    async read(id: number, userId: number): Promise<Income>  {
        return this.repository.read(id, userId);
    }

    async getList(userId: number, offset: number = 0,limit: number = 10): Promise<IIncome []>  {
        const incomes = await this.repository.getList(userId, offset, limit);
        return incomes;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeService, 'incomeService', ['incomeRepository']);
});

export default init;