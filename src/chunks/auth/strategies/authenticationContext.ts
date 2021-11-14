import { IAuthentication } from "../../../interfaces/authentication";
import { JWTType } from "../../../interfaces/tokenType";
import User from "../../user/user";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }

    verify(token: string): Promise<User> {
        console.log('context', token);
        return this.strategy.verify(token);
    }
}