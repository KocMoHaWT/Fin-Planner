
export interface IAccount {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    createdAt: Date;
    defaultCurrency: any;
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

    constructor(user: IAccount) {
        this._id = user?.id;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._email = user.email;
        this._password = user?.password;
        this._createdAt = user.createdAt;
        this._defaultCurrency = user.defaultCurrency;
    }

    get id() {
        return this._id;
    }

    get user() {
        return { 
            id: this._id, 
            firstName: this._firstName, 
            lastName: this._lastName, 
            email: this._email, 
            createdAt: this._createdAt, 
            defaultCurrency: this._defaultCurrency 
        };
    }
}
