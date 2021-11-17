interface IIncomeType {
    title: string;
    minCheck: number;
    maxCheck: number;
    leftOver: number;
    regular: boolean;
    planned: boolean; /// need to think of how handle date
}

export enum Status {
    done = 'done',
    inProgress = 'inProgress',
    empty = 'empty'
}

export interface IIncome {
    id: number;
    title: string;
    description: string;
    check: number;
    currency: string; // change to interface
    incomeType: IIncomeType;
    userId: number;
    status: Status;
}

export class Income {
    private _id: number;
    private _title: string;
    private _description: string;
    private _check: number
    private _currency: string;
    private _incomeType: IIncomeType;
    private _userId: number;
    private _status: Status;

    constructor({ id, title, description, check, currency, incomeType, userId, status }: IIncome) {
        this._id = id;
        this._title = title;
        this._check = check;
        this._description = description;
        this._currency = currency;
        this._incomeType = incomeType;
        this._userId = userId;
        this._status = status;
    }


    toJSON(): IIncome {
        return {
            id: this._id,
            title: this._title,
            check: this._check,
            description: this._description,
            currency: this._currency,
            incomeType: this._incomeType,
            userId: this._userId,
            status: this._status
        }
    }

    set(income: Partial<IIncome>) {
        this._title = income?.title || this._title;
        this._check = income?.check || this._check;
        this._description = income?.description || this._description;
        this._currency = income.currency || this._currency;
        this._incomeType = income.incomeType || this._incomeType;
    }
}