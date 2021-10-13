import Account from "../chunks/user/user";
import { JWTType } from "./tokenType";

export interface IAuthentication {
    validate: (token: string) => Promise<Account | number>;
    createToken?: (id: number, type: JWTType) => Promise<string>;
}