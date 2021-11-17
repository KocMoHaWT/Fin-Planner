import BucketRepositoryInit from './repository';
import BucketServiceInit from './service';
import BucketRouterInit from './router';
import BucketControllerInit from './controller';

const init = [BucketRepositoryInit,BucketServiceInit, BucketControllerInit, BucketRouterInit];

export default init;