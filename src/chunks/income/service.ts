import { CustomRequest } from "../../interfaces/request";
import { IncomeRepository, IIncomeRepository } from "./repository";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";
import { Income } from "./income";

export interface IIncomeService {
    create: (req: CustomRequest, res: Response) => Promise<Response>;
    update: (req: CustomRequest, res: Response) => Promise<Response>;
    getList: (req: CustomRequest, res: Response) => Promise<Response>;
    read: (req: CustomRequest, res: Response) => Promise<Response>;
    delete: (req: CustomRequest, res: Response) => Promise<void>;
}

export class IncomeService implements IIncomeService {
    private repository: IIncomeRepository;

    constructor({ incomeRepository }: { incomeRepository: IIncomeRepository }) {
        this.repository = incomeRepository;
    }

    async create(req: CustomRequest, res: Response): Promise<Response> {
        const data = new Income(req.body)
        const newIncome =  await this.repository.create(data.toJSON());
        return res.status(200).json({ income: newIncome.toJSON()});
    }

    async update(req: CustomRequest, res: Response): Promise<Response> {
        const income = new Income(req.body)
        return res.status(200).json({...income});
    }

    async delete(req: CustomRequest, res: Response): Promise<void> {
        await this.repository.delete(+req.params.id);
        return res.status(200).end();
    }

    async read(req: CustomRequest, res: Response): Promise<Response>  {
        const income = await this.repository.read(+req.params.id);
        return res.status(200).json({...income});
    }

    async getList(req: CustomRequest, res: Response): Promise<Response>  {
        const incomes = await this.repository.getList(+req.params.offset, +req.params.limit, req.user.id);
        return res.status(200).json(incomes);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeService, 'incomeService', ['incomeRepository']);
});

export default init;