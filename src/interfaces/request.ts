import User from "../chunks/user/user";
import { Request } from 'express';

export interface CustomRequest extends Request {
    user: User;
}