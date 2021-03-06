import { IActivityLog } from "../../interfaces/activityLog";
import { ActivityLog } from "../../models/activityLog";

export enum Status {
    done = 'done',
    inProgress = 'inProgress',
    empty = 'empty'
}

export interface IIncome {
    id: number;
    title: string;
    ammount: number;
    currency: string; // change to interface
    userId: number;
    date: Date;
    regular: boolean;
    logs?: IActivityLog[];
}

export class Income implements IIncome {
    id: number;
    title: string;
    ammount: number;
    currency: string;
    userId: number;
    date:Date;
    regular: boolean;
    logs?: IActivityLog[];

    constructor({ id, title, date, ammount, currency, userId, regular }: IIncome, defaultCurrency?: string) {
        this.id = id;
        this.title = title;
        this.ammount = +ammount;
        this.date = date;
        this.currency = currency || defaultCurrency;
        this.userId = userId;
        this.regular = regular
    }
  
    toJSON(): IIncome {
        return {
            id: this.id,
            title: this.title,
            ammount: this.ammount,
            date: this.date,
            currency: this.currency,
            userId: this.userId,
            regular: this.regular,
            logs: this.logs
        }
    }

    setLogs(logs: IActivityLog[]) {
        this.logs = logs;
    }

    set(income: Partial<IIncome>) {
        this.title = income?.title || this.title;
        this.ammount = income?.ammount || this.ammount;
        this.date = income?.date || this.date;
        this.currency = income.currency || this.currency;
        this.regular = income.regular || this.regular;
    }
}