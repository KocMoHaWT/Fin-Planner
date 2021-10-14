import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import User from "../../user/user";


export default class GoogleStrategy implements IAuthentication {
    validate(token: string): Promise<User> {
        return Promise.resolve(new User(testAcc));
    }
}