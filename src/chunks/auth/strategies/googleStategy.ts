import { OAuth2Client } from "google-auth-library";
import { IAuthentication } from "../../../interfaces/authentication";
import { testAcc } from "../../../utils/testAcc";
import User from "../../user/user";
import envs from '../../../config';
import { IUserService } from "../../user/service";
import { IAuthService } from "../service";
import AuthenticationData from "../valueObjects/authenticationData";


export default class GoogleStrategy implements IAuthentication {
    private authService: IAuthService;
    private userService: IUserService;
    client: any;
    constructor({ authService, userService }: { authService: IAuthService, userService: IUserService }) {
        this.authService = authService;
        this.client = new OAuth2Client(envs.googleId);
        this.userService = userService;
    }
    async verify(token: string): Promise<User> {
        console.log('token', token);
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: envs.googleId,  // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            // check if exists 
            // if yes return user
            // if not save anad return user
            const user = await this.authService.getUserByGoogleId(payload['sub']);
            if (!user) {
                const authUser = new AuthenticationData({ email: payload?.email, name: payload?.name })
                // todo develop transaction here or another save way to update both table
                const newUser = await this.userService.create(authUser);
                await this.authService.create(newUser.id);
                return newUser;
            }
            return user;
        } catch(e) {
            throw new Error(e);
        }
    }
}