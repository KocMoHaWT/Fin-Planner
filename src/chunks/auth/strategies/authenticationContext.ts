import { IAuthentication } from "../../../interfaces/authentication";
import { JWTType } from "../../../interfaces/tokenType";
import User from "../../user/user";

export default class AuthenticationContext {
    strategy: IAuthentication;


    setStrategy(strategy: IAuthentication) {
        this.strategy = strategy;
    }
    verifyByCredentials(email: string, password: string): Promise<User> {
        return this.strategy.verify(email, password);
    }

    verifyByToken(token: string): Promise<User> {
        return this.strategy.verifyByToken(token);
    }

    createToken(id: number, type: JWTType) {
        this.strategy?.createToken && this.strategy.createToken(id, type);
    }
}