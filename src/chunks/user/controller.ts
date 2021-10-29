import { IUserService } from "./service";
import { Response, Request } from "express";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";

export interface IUserController {
    create: (req: Request, res: Response) => Promise<any>;
    update: (req: Request, res: Response) => Promise<any>;
    read: (req: Request, res: Response) => Promise<any>;
}

export class UserController implements IUserController {
    private service: IUserService;

    constructor({ userService }: { userService: IUserService }) {
        this.service = userService;
    }

    async create(req: Request, res: Response) {
        return this.service.createUser(req, res);
    }

    async read(req: CustomRequest, res: Response) {
        return this.service.sendUserToFront(req, res);
    }

    async update(req: Request, res: Response) {
        return this.service.updateUser(req, res);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(UserController, 'userController', ['userService']);
});

export default init;