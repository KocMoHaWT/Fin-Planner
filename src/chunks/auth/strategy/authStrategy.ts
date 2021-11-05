import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import Account from "../../user/user";
import * as jwt from "jsonwebtoken";
import envs from '../../../config';
import { JWTType } from "../../../interfaces/tokenType";
import User from "../../user/user";
import { IUserService } from "../../user/service";

export default class AuthStrategy implements IAuthentication {
    userService: IUserService;
    constructor({ userService }: { userService: IUserService}) {
        this.userService = userService;
    }
    async verify(email: string, password: string): Promise<User> {
        return await this.userService.verifyUser(email, password);
    }
}