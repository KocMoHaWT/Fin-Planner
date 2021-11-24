import { MovementDirection } from "./moneyMovementDirection";

export interface IActivityLog {
    bucketId: number;
    incomeId: number;
    ammount: number;
    direction: MovementDirection;
}