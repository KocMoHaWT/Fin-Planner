import AuthControllerInit from "./controller";
import AuthRouterInit from "./router";
import AuthServiceInit from "./service";
import RedisRepositoryInit from './datasource/redis';

const init = [AuthControllerInit,AuthRouterInit, AuthServiceInit, RedisRepositoryInit];

export default init;