import { EntityManager, getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { TokenType } from "../../interfaces/tokenType";
import AuthData from "../auth/valueObjects/authenticationData";
import User from "../user/user";

export interface IAuthRepository {
    saveRefreshToken: (refreshToken: string, id: number) => Promise<void>;
    addIdentity: (id: number, identity: string, type: Identity) => Promise<void>;
    getUserByIdentity: (identity: string, type: Identity) => Promise<User | null>;
    create: (userId: number) => Promise<void>;
    getUserAuthByRefreshToken: (refreshToken: string) => Promise<string>
}

const TokenByType = {
    'googleToken': 'google',
    'appleToken': 'apple'
}
type Identity = TokenType.apple | TokenType.google;

export class AuthRepository implements IAuthRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    saveRefreshToken = async (
        refreshToken: string,
        id: number
    ): Promise<void> => {
        await getManager().query(
            `
          UPDATE usersauth 
          SET refresh_token = $1
          WHERE user_id = $2
        `,
            [refreshToken, id]
        );
    };

    async create(userId: number) {
        return await this.manager().query(
            `
        INSERT INTO usersauth (user_id)
        VALUES ($1);
    `,
            [userId]
        )
    }

    async addIdentity(id: number, identity: string, type: Identity): Promise<void> {
        this.manager().query(
            `
        UPDATE usersauth
        SET ${TokenByType[type]}=$1
        WHERE user=$2
    `,
            [identity, id]
        )
        return null;
    }

    async getUserByIdentity(identity: string, type: Identity): Promise<User | null> {
        const res = await this.manager().query(`
            SELECT users.email, users.name, users.id, user.default_currency as defaultCurrency
            FROM usersauth
            RIGHT JOIN users
            ON usersauth.user_id = users.id
            WHERE ${TokenByType[type]} = $1;
        `, [identity]);

        if (res.length) {
            return new User(res[0]);
        }
        return null;
    }

    async getUserAuthByRefreshToken(refreshToken: string): Promise<string> {
        const res = await this.manager().query(`
            SELECT user_id as userId 
            FROM usersauth
            WHERE refresh_token = $1;
        `, [refreshToken]);
        return res.pop();
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthRepository, 'authRepository', ['manager']);
})

export default init;