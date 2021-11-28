
export interface IUser {
    id?: number;
    name: string;
    email: string;
    createdAt?: Date;
    defaultCurrency?: string;
}

export default class User {
    private _id?: number;
    private _name: string;
    private _email: string;
    private _createdAt: Date;
    // change
    private _defaultCurrency: string;

    constructor(User: IUser) {
        this._id = User?.id;
        this._name = User.name;
        this._email = User.email;
        this._createdAt = User.createdAt;
        this._defaultCurrency = User.defaultCurrency
    }

    get id() {
        return this._id;
    }

    get defaultCurrency() {
        return this._defaultCurrency;
    }

    toJSON() {
        return { 
            id: this._id, 
            name: this._name, 
            email: this._email, 
            createdAt: this._createdAt, 
            defaultCurrency: this._defaultCurrency 
        };
    }

    set(user: Partial<IUser>) {
        this._name = user?.name || this._name;
        this._defaultCurrency = user?.defaultCurrency || this._defaultCurrency;
    }
}
