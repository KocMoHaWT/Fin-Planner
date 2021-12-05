import { CustomRequest } from "../../interfaces/request";
import { IIncomeService } from "./service";
import { Response, Request } from "express";
import InjectableContainer from "../../application/InjectableContainer";

export interface IIncomeController {
    read: (req: Request, res: Response) => Promise<any>;
    getList: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
    update: (req: Request, res: Response) => Promise<any>;
    create: (req: Request, res: Response) => Promise<any>;
}

export class IncomeController implements IIncomeController {
  private service: IIncomeService;

    constructor({ incomeService }: { incomeService: IIncomeService }) {
        this.service = incomeService;
    }

    async create(req: CustomRequest, res: Response) {
        const newIncome = this.service.create(req.body, req.user);
        return res.status(200).json({ income: newIncome});
    }

    async delete(req: CustomRequest, res: Response) {
        await this.service.delete(req, res);
        return res.status(200).end();
    }

    async getList(req: CustomRequest, res: Response) {
        const incomes =  this.service.getList(req.user.id, +req.query.offset, +req.query.limit);
        return res.status(200).json(incomes);
    }

    async read(req: CustomRequest, res: Response) {
        const income =  this.service.read(+req.params.id, req.user.id);
        return res.status(200).json({...income})
    }

    async update(req: CustomRequest, res: Response) {
        const newIncome = this.service.update(+req.params.id, req.user, req.body);
        return res.status(200).json({...newIncome});
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeController, 'incomeController', ['incomeService']);
});

export default init;