import Account from "../chunks/user/user";
import { JWTType } from "./tokenType";

type test = {
    token: string
}

export interface IAuthentication {
    verify?: (email: string, password?: string) => Promise<Account | number>;
    verifyByToken?: (token: string) => Promise<Account | number>;
    createToken?: (id: number, type: JWTType) => Promise<string>;
}