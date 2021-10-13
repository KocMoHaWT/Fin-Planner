import Account from "../chunks/account/account";
import { JWTType } from "./tokenType";

export interface IAuthentication {
    validate: (token: string) => Account | boolean;
    createToken?: (id: number, type: JWTType) => Promise<string>;
}