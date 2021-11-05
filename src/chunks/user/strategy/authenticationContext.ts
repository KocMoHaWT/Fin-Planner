import { IAuthentication } from "../../../interfaces/authentication";
import { JWTType } from "../../../interfaces/tokenType";
import Account from "../user";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }
    verifyByCredentials(email: string, password: string): Promise<Account | number> {
        return this.strategy.verify(email, password);
    }

    verifyByToken(token: string): Promise<Account | number> {
        return this.strategy.verifyByToken(token);
    }

    createToken(id: number, type: JWTType) {
        this.strategy?.createToken && this.strategy.createToken(id, type);
    }
}