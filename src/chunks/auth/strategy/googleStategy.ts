import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../../user/user";


export default class GoogleStrategy implements IAuthentication {
    validate(token: string): Promise<Account> {
        return Promise.resolve(new Account({...testAcc}));
    }
}