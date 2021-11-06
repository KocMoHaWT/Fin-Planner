import { Tedis } from 'tedis';
import InjectableContainer from '../../../application/InjectableContainer';
import envs from '../../../config';

export interface IRedisRepository {
    kwa: () => void;
}

class RedisRepository implements IRedisRepository {
    private client: any;

    constructor() {
        this.client = new Tedis({
            host: envs.redisHost,
            port: +envs.redisPort,
            password: envs.redisPassword
        })
        this.client.set('framework', 'ReactJS');
    }

    async kwa() {
        const value = await this.client.get('framework');
        console.log('===>>>',value);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(RedisRepository, 'redisRepository', []);
});

export default init;