interface IBucketType {
    title: string;
    minCheck: number;
    maxCheck: number;
    leftOver: number;
    regular: boolean;
    planned: boolean; /// need to think of how handle date
}

interface IBucket {
    id: number;
    title: string;
    description: string;
    check: number;
    currency: string; // change to interface
    bucketType: IBucketType;
    userId: number;
}

class Bucket {
    private _id: number;
    private _title: string;
    private _description: string;
    private _check: number
    private _currency: string;
    private _bucketType: IBucketType;
    private _userId: number;

    constructor({ id, title, description, check, currency, bucketType, userId }: IBucket) {
        this._id = id;
        this._title = title;
        this._check = check;
        this._description = description;
        this._currency = currency;
        this._bucketType = bucketType;
        this._userId = userId;
    }


    toJSON(): IBucket {
        return {
            id: this._id,
            title: this._title,
            check: this._check,
            description: this._description,
            currency: this._currency,
            bucketType: this._bucketType,
            userId: this._userId,
        }
    }

    set(bucket: Partial<IBucket>) {
        this._title = bucket?.title || this._title;
        this._check = bucket?.check || this._check;
        this._description = bucket?.description || this._description;
        this._currency = bucket.currency || this._currency;
        this._bucketType = bucket.bucketType || this._bucketType;
    }
}