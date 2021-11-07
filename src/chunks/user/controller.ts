import { IUserService } from "./service";
import { Response, Request } from "express";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";

export interface IUserController {
    update: (req: Request, res: Response) => Promise<any>;
    read: (req: Request, res: Response) => Promise<any>;
    login: (req: Request, res: Response) => Promise<any>;
}

export class UserController implements IUserController {
    private service: IUserService;

    constructor({ userService }: { userService: IUserService }) {
        this.service = userService;
    }

    async login(req: Request, res: Response) {
        return this.service.loginUser(req, res);
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