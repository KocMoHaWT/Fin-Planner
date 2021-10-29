import UserRepositoryInit from './repository';
import UserServiceInit from './service';
import UserRouterInit from './router';
import UserControllerInit from './controller';

const init = [UserRepositoryInit,UserServiceInit, UserControllerInit, UserRouterInit];

export default init;