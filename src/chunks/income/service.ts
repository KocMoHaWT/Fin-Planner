import { CustomRequest } from "../../interfaces/request";
import { IIncomeRepository } from "./repository";
import { Response } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { IIncome, Income } from "./income";
import User from "../user/user";
import { IActivityLogService } from "../activityLogs/service";

export interface IIncomeService {
    create: (body: IIncome, user: User) => Promise<IIncome>;
    update: (incomeId: number, user: User, body: IIncome) => Promise<Income>;
    getList: (userId: number, offset?: number, limit?: number) => Promise<IIncome[]>;
    read: (id: number, userId: number) => Promise<Income>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
    getIncome: (id: number, userId: number) => Promise<IIncome>;
}

export class IncomeService implements IIncomeService {
    private repository: IIncomeRepository;
    private activityLogService: IActivityLogService;

    constructor({ incomeRepository, activityLogService }: { activityLogService: IActivityLogService, incomeRepository: IIncomeRepository }) {
        this.repository = incomeRepository;
        this.activityLogService = activityLogService;
    }

    async create(body: IIncome, user: User): Promise<IIncome> {
        const data = new Income(body, user.defaultCurrency);
        const newIncome = await this.repository.create(data.toJSON(), user.id);
       return newIncome.toJSON();
    }

    async update(incomeId: number, user: User, body: IIncome): Promise<Income> {
        const oldIncome = await this.repository.read(incomeId, user.id);
        oldIncome.set(body);
        return this.repository.update(oldIncome);   
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        await this.repository.delete(+req.params.id, req.user.id);
    }

    async getIncome(id: number, userId: number): Promise<IIncome>  {
        const income = await this.repository.read(id, userId);
        console.log('qew',this.activityLogService);
        const logs = await this.activityLogService.getIncomeLogs(id, userId);
        income.setLogs(logs);
        return income.toJSON();
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
    InjectableContainer.setDependency(IncomeService, 'incomeService', ['incomeRepository', 'activityLogService']);
});

export default init;