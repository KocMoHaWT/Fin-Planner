import { EntityManager, getManager } from "typeorm";
import InjectableContainer from "../../application/InjectableContainer";
import { TokenType } from "../../interfaces/tokenType";
import AuthData from "../auth/valueObjects/authenticationData";
import User, { IUser } from "./user";

export interface IUserRepository {
    create: (User: AuthData) => Promise<void>;
    update: (User: User) => Promise<void>;
    isUserExists: (email: string) => Promise<User>;
    verifyUser: (email: string, password: string) => Promise<User>;
    findById: (id: number) => Promise<User>;
    findByEmail: (email: string) => Promise<{ id: number }>;
}

const TokenByType = {
    'googleToken': 'googleIdentity',
    'appleToken': 'appleIdentity'
}
type Identity = TokenType.apple | TokenType.google;

export class UserRepository implements IUserRepository {
    private manager: typeof getManager;

    constructor({ manager }: { manager: typeof getManager }) {
        this.manager = manager;
    }

    async create(user: AuthData): Promise<void> {
        return await this.manager().query(
            `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
    `,
            [user.name, user.email, user.password]
        )
    }

    async verifyUser(email: string, password: string): Promise<User> {
        const res = await this.manager().query(
            `
        SELECT * FROM users WHERE email=$1 AND password = $2;
    `,
            [email, password]
        )
        if (res.length) {
            return new User(res[0]);
        }
        return null;
    }

    async findByEmail(email: string): Promise<{ id: number }> {
        const res = await this.manager().query(
            `
       SELECT id FROM users
        WHERE email = $1;
    `,
            [email]
        )
        return res.pop();
    }

    async update(user: User): Promise<void> {
        const simpleUser = user.toJSON();
        const res = await this.manager().query(
            `
        UPDATED users
        SET name=$1, defaultCurrency=$2
        WHERE id=$1
    `,
            [simpleUser.name, simpleUser.defaultCurrency]
        )
        return res;
    };

    async isUserExists(email: string): Promise<User> {
        const res = await this.manager().query(
            `
        SELECT * FROM users WHERE email=$1;
    `,
            [email]
        )
        return res.pop();
    }

    async findById(id: number): Promise<User> {
        const res = await this.manager().query(
            `
        SELECT * FROM users WHERE id=$1;
    `,
            [id]
        )
        if (res.length) {
            return new User(res[0]);
        }
        return null;
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(UserRepository, 'userRepository', ['manager']);

    /// get another place for this one
    InjectableContainer.setDependency(getManager, 'manager', []);
})

export default init;