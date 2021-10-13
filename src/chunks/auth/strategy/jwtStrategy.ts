import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../../account/account";
import * as jwt from "jsonwebtoken";
import envs from '../../../config';
import { JWTType } from "../../../interfaces/tokenType";

export default class JWTStrategy implements IAuthentication {
    validate(token: string) {
        try {
            jwt.verify(token, envs.jwtSecret as string, { ignoreExpiration: false }) as { payload: string };

        } catch {
            throw new Error('invalid token');
        }
        return true;
    }

    async createToken(id: number, type: JWTType) {
        return jwt.sign({ payload: id }, envs.jwtSecret, {
            expiresIn: type === JWTType.access ? envs.accessExpire : envs.refreshExpire,
          });
    }
}