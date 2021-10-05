import { AccountController } from "./controller";
import { AccountRouter } from "./router";
import { AccountService } from "./service";


const service = new AccountService();
const controller = new AccountController(service);
const commonPath = '/user';
const AuthRoutes = new AccountRouter({ controller, commonPath });


export default AuthRoutes;