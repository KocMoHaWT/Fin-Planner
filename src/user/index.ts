import { UserController } from "./controller";
import { UserRouter } from "./router";
import { AuthService } from "./service";

const service = new AuthService();
const controller = new UserController(service);
const commonPath = '/user';
const AuthRoutes = new UserRouter({ controller, commonPath });


export default AuthRoutes;