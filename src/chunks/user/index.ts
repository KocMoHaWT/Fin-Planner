import { UserController } from "./controller";
import { UserRouter } from "./router";
import { UserService } from "./service";
import UserRepository from "./repository";
import { getManager } from "typeorm";

const repository = new UserRepository(getManager);
const service = new UserService(repository);
const controller = new UserController(service);
const commonPath = '/users';
const userRouter = new UserRouter({ controller, commonPath });


export default userRouter;