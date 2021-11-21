export interface IBucketType {
    id: number;
    title: string;
    strict?: boolean;
    planning?: boolean;
    regular?: boolean;
    leftover?: boolean;
}