import { OAuth2Client } from "google-auth-library";
import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import User from "../user";
import envs from '../../../config';
import { IUserService } from "../service";


export default class GoogleStrategy implements IAuthentication {
    private userService: IUserService;
    client: any;
    constructor({ userService }: { userService: IUserService }) {
        this.userService = userService;
        this.client = new OAuth2Client(envs.googleId)
    }
    async verify(token: string): Promise<User> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: envs.googleId,  // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();

        } catch {
            throw new Error('we fucked');
        }
        return Promise.resolve(new User(testAcc));
    }
}