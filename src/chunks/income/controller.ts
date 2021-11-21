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
        return this.service.create(req, res);
    }

    async delete(req: CustomRequest, res: Response) {
        return this.service.delete(req, res);
    }

    async getList(req: CustomRequest, res: Response) {
        return this.service.getList(req, res);
    }

    async read(req: CustomRequest, res: Response) {
        console.log('res');
        return this.service.read(req, res);
    }

    async update(req: CustomRequest, res: Response) {
        return this.service.update(req, res);
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(IncomeController, 'incomeController', ['incomeService']);
});

export default init;