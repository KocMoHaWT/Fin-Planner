import { IAuthentication } from "../../../interfaces/authentication";
import { JWTType } from "../../../interfaces/tokenType";
import Account from "../../account/account";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }

    validate(token: string): Account | boolean {
        return this.strategy.validate(token);
    }

    createToken(id: number, type: JWTType) {
        this.strategy?.createToken && this.strategy.createToken(id, type);
    }
}