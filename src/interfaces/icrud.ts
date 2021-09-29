export interface CRUD<T> {
    create: (req: Request, res: Response ) => Promise<T>;
    update: (req: Request, res: Response ) => Promise<T>;
    get: (req: Request, res: Response ) => Promise<T>;
    delele: (req: Request, res: Response ) => Promise<any>;
}