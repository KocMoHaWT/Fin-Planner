import { Response, Request } from "express";

export interface IAuthService {
    test: (req: Request, res: Response) => Promise<Response>
}

export class AuthService implements IAuthService{
    constructor() {}

    async test(req: Request, res: Response): Promise<Response> {
        return res.status(200).send('heh');
    }
}