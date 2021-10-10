import { EntityManager, getManager } from "typeorm";
import AuthData from "../auth/valueObjects/authenticationData";
import Account, { IAccount } from "./account";

export interface IAccountRepository {
    create: (account: AuthData) => Promise<void>;
    findByid: () => Promise<IAccount[]>;
    update: (account: Account) => Promise<IAccount>;
    isAccountExists: (email: string) => Promise<boolean>;
    findById: (id: number) => Promise<IAccount>;
}

export default class AccountRepository implements IAccountRepository {
    private manager: typeof getManager;

    constructor(mangager: typeof getManager) {
        this.manager = mangager;
    }

    async create(account: AuthData): Promise<void> {
        await this.manager().query(
            `
        INSERT INTO accounts (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4);
    `,
            [account.firstName, account.lastName, account.email, account.password]
        )
    }

    async update(account: Account): Promise<IAccount> {
        const simpleAccount = account.toJSON();
        const res = await getManager().query(
            `
        UPDATED accounts
        SET firstName=$1, lastName=$2, defaultCurrency=$3
        WHERE id=$1
    `,
            [simpleAccount.firstName, simpleAccount.lastName, simpleAccount.defaultCurrency]
        )
        if (res.length) {
            return res[0];
        }
        return null;
    };

    async isAccountExists(email: string): Promise<boolean> {
        const res = await getManager().query(
            `
        SELECT * FROM accounts WHERE email=$1;
    `,
            [email]
        )
        return res.length;
    }

    async findById(id: number): Promise<IAccount> {
        const res = await getManager().query(
            `
        SELECT * FROM accounts WHERE id=$1;
    `,
            [id]
        )
        if (res.length) {
            return res[0];
        }
        return null;
    }
}