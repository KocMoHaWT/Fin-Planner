
export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    createdAt?: Date;
    defaultCurrency?: any;
}

export default class User {
    private _id?: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    protected _password: string;
    private _createdAt: Date;
    // change
    private _defaultCurrency: any;

    constructor(User: IUser) {
        this._id = User?.id;
        this._firstName = User.firstName;
        this._lastName = User.lastName;
        this._email = User.email;
        this._password = User?.password;
        this._createdAt = User.createdAt;
        this._defaultCurrency = User.defaultCurrency;
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

    set(User: Partial<IUser>) {
        this._firstName = User?.firstName || this._firstName;
        this._lastName = User?.lastName || this._lastName;
        this._defaultCurrency = User?.defaultCurrency || this._defaultCurrency;
    }
}
