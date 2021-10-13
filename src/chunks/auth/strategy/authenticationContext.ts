import { IAuthentication } from "../../../interfaces/authentication";
import { JWTType } from "../../../interfaces/tokenType";
import Account from "../../user/user";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }

    validate(token: string): Promise<Account | number> {
        return this.strategy.validate(token);
    }

    createToken(id: number, type: JWTType) {
        this.strategy?.createToken && this.strategy.createToken(id, type);
    }
}