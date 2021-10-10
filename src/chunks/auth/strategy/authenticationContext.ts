import { IAuthentication } from "../../../interfaces/authentication";
import Account from "../../account/account";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }

    validate(token: string): Account {
        return this.strategy.validate(token);
    }

    createToken(id: number) {
        this.strategy?.createToken && this.strategy.createToken(id);
    }
}