import { EntityManager, getManager } from "typeorm";
import { TokenType } from "../../interfaces/tokenType";
import AuthData from "../auth/valueObjects/authenticationData";
import User, { IUser } from "./user";

export interface IUserRepository {
    create: (User: AuthData) => Promise<void>;
    update: (User: User) => Promise<IUser>;
    isUserExists: (email: string) => Promise<boolean>;
    findById: (id: number) => Promise<IUser>;
}

const TokenByType = {
    'googleToken': 'googleIdentity',
    'appleToken': 'appleIdentity'
}
type Identity = TokenType.apple | TokenType.google;

export default class UserRepository implements IUserRepository {
    private manager: typeof getManager;

    constructor(mangager: typeof getManager) {
        this.manager = mangager;
    }

    async create(User: AuthData): Promise<void> {
        await this.manager().query(
            `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
    `,
            [User.name, User.email, User.password]
        )
    }

    async update(User: User): Promise<IUser> {
        const simpleUser = User.toJSON();
        const res = await getManager().query(
            `
        UPDATED users
        SET firstName=$1, lastName=$2, defaultCurrency=$3
        WHERE id=$1
    `,
            [simpleUser.firstName, simpleUser.lastName, simpleUser.defaultCurrency]
        )
        if (res.length) {
            return res[0];
        }
        return null;
    };

    async isUserExists(email: string): Promise<boolean> {
        const res = await getManager().query(
            `
        SELECT * FROM users WHERE email=$1;
    `,
            [email]
        )
        return res.pop();
    }

    async findById(id: number): Promise<IUser> {
        const res = await getManager().query(
            `
        SELECT * FROM users WHERE id=$1;
    `,
            [id]
        )
        if (res.length) {
            return res[0];
        }
        return null;
    }

    async addIdentity(id: number, identity: string, type: Identity): Promise<void> {
        await getManager().query(
            `
        UPDATE users-auth
        SET ${TokenByType[type]}=$1
        WHERE user=$2
    `,
            [identity, id]
        )
        return null;
    }
}