import User from "../chunks/user/user";
import { JWTType } from "./tokenType";

type test = {
    token: string
}

export interface IAuthentication {
    verify?: (email: string, password?: string) => Promise<User>;
    verifyByToken?: (token: string) => Promise<User>;
    createToken?: (id: number, type: JWTType) => Promise<string>;
}