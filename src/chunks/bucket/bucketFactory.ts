import { IBucketType } from "../../interfaces/bucketType";
import { PeriodType } from "../../interfaces/periodType";
import { BucketType } from "../../models/bucketType";
import { Income } from "../income/income";
import { Bucket, IBucket, Status } from "./bucket";

interface bucketData {
    id: number;
    title: string;
    description: string;
    ammount: number;
    currency: string;
    user_id: number;
    date: Date;
    status: Status;
    period: PeriodType;
    linked_income_id?: number;
    tags: string;
}

class BucketFactory {

    createFromDb({ dbBucketData, bucketType, logs = [] }: { dbBucketData: bucketData, bucketType: BucketType, logs?: any[] }): IBucket {
        // validate data
        const { linked_income_id: linkedIncome = null, user_id: userId, ...bucketData } = dbBucketData;
        const newBucket = {
            ...bucketData,
            bucketType: bucketType,
            userId,
            linkedIncome,
            logs
        }

        return new Bucket(newBucket)
    }

    createFromRequest(bucketData: IBucket) {
        // validate data
        return new Bucket(bucketData)
    }
}

export default new BucketFactory;