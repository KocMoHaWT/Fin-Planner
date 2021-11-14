import { CustomRequest } from "../../interfaces/request";
import { IBucketService } from "./service";

interface IBucketController {
    read: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
    update: (req: Request, res: Response) => Promise<any>;
    create: (req: Request, res: Response) => Promise<any>;
}

export class BucketController {
  private service: IBucketService;

    constructor({ userService }: { userService: IBucketService }) {
        this.service = userService;
    }

    async create(req: Request, res: Response) {
        // return this.service.loginUser(req, res);
    }

    async delete(req: Request, res: Response) {
        // return this.service.loginUser(req, res);
    }

    async read(req: CustomRequest, res: Response) {
        // return this.service.sendUserToFront(req, res);
    }

    async update(req: Request, res: Response) {
        // return this.service.updateUser(req, res);
    }
}