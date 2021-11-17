import IncomeRepositoryInit from './repository';
import IncomeServiceInit from './service';
import IncomeRouterInit from './router';
import IncomeControllerInit from './controller';

const init = [IncomeRepositoryInit,IncomeServiceInit, IncomeControllerInit, IncomeRouterInit];

export default init;