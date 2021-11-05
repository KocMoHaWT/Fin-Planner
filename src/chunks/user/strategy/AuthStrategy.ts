import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../user";
import * as jwt from "jsonwebtoken";
import envs from '../../../config';
import { JWTType } from "../../../interfaces/tokenType";
import User from "../user";

export default class AuthStrategy implements IAuthentication {
    repository: any;
    constructor(repository: any) {
        this.repository = repository;
    }
    async verify(email: string, password: string): Promise<User> {
        return await this.repository.verifyUser(email, password);
    }
}