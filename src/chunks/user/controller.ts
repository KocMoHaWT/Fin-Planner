import { IUserService } from "./service";
import { Response, Request } from "express";
import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";

export interface IUserController {
    update: (req: Request, res: Response) => Promise<any>;
    read: (req: Request, res: Response) => Promise<any>;
}

export class UserController implements IUserController {
    private service: IUserService;

    constructor({ userService }: { userService: IUserService }) {
        this.service = userService;
    }

    async read(req: CustomRequest, res: Response) {
        try {
            const user = this.service.sendUserToFront(req.user);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(406).json(e);
        }
     
    }

    async update(req: CustomRequest, res: Response) {
        try {
            const updatedUser = await this.service.updateUser(req.user, req.body);
            return res.status(200).json(updatedUser);
        } catch (e) {
            return res.status(406).json(e);
        }
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(UserController, 'userController', ['userService']);
});

export default init;