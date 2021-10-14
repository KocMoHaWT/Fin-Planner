import { AuthController } from "./controller";
import { AuthRouter } from "./router";
import { AuthService } from "./service";

const service = new AuthService();
const controller = new AuthController(service);
const commonPath = '';
const authRoutes = new AuthRouter({ controller, commonPath });


export default authRoutes;