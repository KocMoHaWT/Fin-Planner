import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../user";


export default class AppleStrategy implements IAuthentication {
    verifyByToken(token: string) {
        return Promise.resolve(new Account({...testAcc}));
    }
}