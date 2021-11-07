import { EntityManager, getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { TokenType } from "../../interfaces/tokenType";
import AuthData from "../auth/valueObjects/authenticationData";
import User from "../user/user";

export interface IAuthRepository {
    saveRefreshToken: (refreshToken: string, id: number) => Promise<void>;
    addIdentity: (id: number, identity: string, type: Identity) => Promise<void>;
    getUserByIdentity: (identity: string, type: Identity) => Promise<User | null>;
}

const TokenByType = {
    'googleToken': 'googleIdentity',
    'appleToken': 'appleIdentity'
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
          UPDATE users 
          SET refreshToken = $1
          WHERE id = $2
        `,
            [refreshToken, id]
        );
    };

    async addIdentity(id: number, identity: string, type: Identity): Promise<void> {
        this.manager().query(
            `
        UPDATE users-auth
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
            FROM users-auth
            WHERE ${TokenByType[type]} = $1;
            RIGHT JOIN users
            ON users-auth.userId = users.id;
        `, [identity])
        return null;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(AuthRepository, 'authRepository', ['manager']);
})

export default init;