import { userService } from "../user";
import { AuthController } from "./controller";
import { AuthRouter } from "./router";
import { AuthService } from "./service";

export const authService = new AuthService(userService);
// const controller = new AuthController(authService);
const commonPath = '';
const authRoutes = new AuthRouter({ controller, commonPath });


export default authRoutes;