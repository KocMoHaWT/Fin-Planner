export interface IBucketType {
    id: number;
    title: string;
    strict?: boolean;
    planned?: boolean;
    regular?: boolean;
    leftover?: boolean;
}