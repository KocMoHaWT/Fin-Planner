import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../../user/user";
import * as jwt from "jsonwebtoken";
import envs from '../../../config';
import { JWTType } from "../../../interfaces/tokenType";

export default class JWTStrategy implements IAuthentication {
    getUser: any;
    constructor(getUser: any) {
        this.getUser = getUser;
    }
    async validate(token: string): Promise<number> {
        try {
            const tokenData = jwt.verify(token, envs.jwtSecret as string, { ignoreExpiration: false }) as { id: number };
            const user = await this.getUser(tokenData.id);
            return user;
        } catch {
            return Promise.reject(0);
        }
      
    }

    // async createToken(id: number, type: JWTType) {
    //     return jwt.sign({ payload: id }, envs.jwtSecret, {
    //         expiresIn: type === JWTType.access ? envs.accessExpire : envs.refreshExpire,
    //       });
    // }
}