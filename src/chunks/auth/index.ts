import AuthControllerInit from "./controller";
import AuthRouterInit from "./router";
import AuthServiceInit from "./service";
import RedisRepositoryInit from './datasource/redis';
import AuthRepositoryInit from "./repository";

const init = [AuthControllerInit,AuthRouterInit, AuthServiceInit, RedisRepositoryInit, AuthRepositoryInit];

export default init;