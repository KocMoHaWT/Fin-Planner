import User from "../chunks/user/user";

declare global {
  namespace Express {
      export interface Request {
          user: User;
      }
  }
} 