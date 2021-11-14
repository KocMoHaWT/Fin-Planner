export interface IBucketService {
    create: (body: BucketData) => Promise<User>;
    update: (req: Request, res: Response) => Promise<Response>;
    read: (id: number) => Promise<Bucket>;
    delete: (id: number) => Promise<Response>;
}

export class BucketService {

}