import Account from "../chunks/account/account";

export interface IAuthentication {
    validate: (token: string) => Account;
    createToken?: (id: number) => string;
}