import { IBucketType } from "../../interfaces/bucketType";
import { PeriodType } from "../../interfaces/periodType";
import { Income } from "../income/income";
import { Bucket, IBucket, Status } from "./bucket";

export interface BucketData {
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

    createFromDb({ dbBucketData, bucketType, logs = [] }: { dbBucketData: BucketData, bucketType: IBucketType, logs?: any[] }): Bucket {
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