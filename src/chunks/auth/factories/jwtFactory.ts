import * as jwt from 'jsonwebtoken'
import envs from '../../../config';
import { JWTTokens } from '../../../interfaces/jwtTokens';

class JWTFactory {
    async createTokenPair(id: number): Promise<JWTTokens>   {
        const accessToken = await jwt.sign({ id }, envs.jwtSecret, {
            expiresIn: envs.accessExpire,
        });
        const refreshToken = await jwt.sign({ id }, envs.jwtSecret, {
            expiresIn: envs.refreshExpire,
        });
        return { accessToken, refreshToken }
    }

    async validate(token: string) {
        return jwt.verify(token, envs.jwtSecret);
    }
}

export default new JWTFactory();