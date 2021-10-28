import User from "../chunks/user/user";
import { Request } from 'express';

declare global {
  namespace Express {
      export interface Request {
          user: User;
      }
  }
} 