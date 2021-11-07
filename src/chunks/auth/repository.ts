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
}

const TokenByType = {
    'googleToken': 'gogle',
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
          SET refreshToken = $1
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


    // need to test
    async getUserByIdentity(identity: string, type: Identity): Promise<User | null> {
        this.manager().query(`
            SELECT users.email, users.name, users.id, users.defaultCurrency 
            FROM usersauth
            WHERE ${TokenByType[type]} = $1;
            RIGHT JOIN users
            ON usersauth.userId = users.id;
        `, [identity])
        return null;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthRepository, 'authRepository', ['manager']);
})

export default init;