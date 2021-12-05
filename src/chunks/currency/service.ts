import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";
import { IActivityLog } from "../../interfaces/activityLog";
import { IRedisRepository } from "../auth/datasource/redis";
import axios from "axios";
import envs from '../../config';

export interface ICurrencyService {
    getCurrenctCurrencyValue: (start_currency: string, end_currency: string) => Promise<number>;
}

export class CurrencyService implements ICurrencyService {
    private repository: IRedisRepository;

    constructor({ redisRepository }: { redisRepository: IRedisRepository }) {
        this.repository = redisRepository;
    }

    async getCurrenctCurrencyValue(start_currency: string, end_currency: string): Promise<number> {
        let alreadyExistedValue = +await this.repository.get(start_currency + end_currency);
        if (!alreadyExistedValue) {
            const { data } = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=${envs.currencyApi}&base_currency=${start_currency}`)
            alreadyExistedValue = +data.data[end_currency];
            if (!alreadyExistedValue) {
                throw new Error('wrong curency values');
            }
            await this.repository.set(start_currency + end_currency, alreadyExistedValue);
            await this.repository.expire(start_currency + end_currency, 1000 * 60 * 60 * 12);
        }
        return alreadyExistedValue;
    }
}


const init = new Promise(() => {
    InjectableContainer.setDependency(CurrencyService, 'currencyService', ['redisRepository']);
});

export default init;