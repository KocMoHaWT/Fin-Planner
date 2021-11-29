import { Tedis } from 'tedis';
import InjectableContainer from '../../../application/InjectableContainer';
import envs from '../../../config';

export interface IRedisRepository {
    set: (key: string, value: string | number) => Promise<void>;
    expire: (key: string, value: string | number) => Promise<void>;
    get: (key: string) => Promise<string | number>;
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

    async set(key: string, value: string) {
        return this.client.set(key, value);
    }

    async get(key: string) {
        return this.client.get(key)
    }

    async expire(key: string, value: string) {
        return this.client.expire(key, value);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(RedisRepository, 'redisRepository', []);
});

export default init;