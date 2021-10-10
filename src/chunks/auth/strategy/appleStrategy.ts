import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../../account/account";


export default class AppleStrategy implements IAuthentication {
    validate(token: string) {
        return new Account({...testAcc})
    }
}