
export interface IAccount {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    createdAt?: Date;
    defaultCurrency?: any;
}

export default class Account {
    private _id?: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    protected _password: string;
    private _createdAt: Date;
    // change
    private _defaultCurrency: any;

    constructor(account: IAccount) {
        this._id = account?.id;
        this._firstName = account.firstName;
        this._lastName = account.lastName;
        this._email = account.email;
        this._password = account?.password;
        this._createdAt = account.createdAt;
        this._defaultCurrency = account.defaultCurrency;
    }

    get id() {
        return this._id;
    }

    toJSON() {
        return { 
            id: this._id, 
            firstName: this._firstName, 
            lastName: this._lastName, 
            email: this._email, 
            createdAt: this._createdAt, 
            defaultCurrency: this._defaultCurrency 
        };
    }

    set(account: Partial<IAccount>) {
        this._firstName = account?.firstName || this._firstName;
        this._lastName = account?.lastName || this._lastName;
        this._defaultCurrency = account?.defaultCurrency || this._defaultCurrency;
    }
}
