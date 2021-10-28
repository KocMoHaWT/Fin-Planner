import { UserController } from "./controller";
import { UserRouter } from "./router";
import { UserService } from "./service";
import { authService } from '../auth';
import UserRepository from "./repository";
import { getManager } from "typeorm";

const repository = new UserRepository(getManager);
export const userService = new UserService(repository);
const userController = new UserController(userService);

const commonPath = '/users';
const userRouter = new UserRouter({ userController, commonPath, authService });


export default userRouter;