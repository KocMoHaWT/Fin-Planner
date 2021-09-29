import { Response, Request } from "express";

export interface IUserService {
    test: (req: Request, res: Response) => Promise<Response>
}

export class AuthService implements IUserService{
    constructor() {}

    async test(req: Request, res: Response): Promise<Response> {
        return res.status(200).send('heh');
    }
}