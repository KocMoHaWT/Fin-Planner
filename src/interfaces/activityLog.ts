import { MovementDirection } from "./moneyMovementDirection";

export interface IActivityLog {
    bucketId: number;
    incomeId: number;
    ammount: number;
    direction: MovementDirection;
    currencyValue: number;
    start_currency: string;
    end_currency: string;
}