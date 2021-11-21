import { IBucketType } from "../../interfaces/bucketType";
import { PeriodType } from "../../interfaces/periodType";

export enum Status {
    done = 'done',
    inProgress = 'inProgress',
    empty = 'empty'
}

export interface IBucket {
    id: number;
    title: string;
    description: string;
    ammount: number;
    currency: string; // change to interface
    bucketType: IBucketType | number;
    userId: number;
    status: Status;
    period?: PeriodType;
    date?: Date;
    linkedIncome?: number;
    tags?: string;
}


export class Bucket implements IBucket{
    id: number;
    title: string;
    description: string;
    ammount: number;
    currency: string;
    bucketType: number | IBucketType;
    userId: number;
    status: Status;
    period?: PeriodType;
    date?: Date;
    linkedIncome?: number;
    tags?: string;

    constructor({ id, title, description, tags, ammount, currency, bucketType, userId, status, period, date, linkedIncome }: IBucket) {
        this.id = id;
        this.title = title;
        this.ammount = ammount;
        this.description = description;
        this.currency = currency;
        this.bucketType = bucketType;
        this.userId = userId;
        this.status = status;
        this.period = period;
        this.date = date;
        this.linkedIncome = linkedIncome;
        this.tags = tags
    }



    toJSON(): IBucket {
        return {
            id: this.id,
            title: this.title,
            ammount: this.ammount,
            description: this.description,
            currency: this.currency,
            bucketType: this.bucketType,
            userId: this.userId,
            status: this.status,
            period: this.period,
            date: this.date,
            linkedIncome: this.linkedIncome,
            tags: this.tags,
        }
    }

    set(bucket: Partial<IBucket>) {
        this.title = bucket?.title || this.title;
        this.ammount = bucket?.ammount || this.ammount;
        this.description = bucket?.description || this.description;
        this.currency = bucket.currency || this.currency;
        this.bucketType = bucket.bucketType || this.bucketType;
    }
}