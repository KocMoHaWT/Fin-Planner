import AuthControllerInit from "./controller";
import AuthRouterInit from "./router";
import AuthServiceInit from "./service";

const init = [AuthControllerInit,AuthRouterInit, AuthServiceInit];

export default init;