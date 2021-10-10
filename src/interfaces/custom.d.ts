import Account from "../chunks/account/account";

declare global {
  namespace Express {
      export interface Request {
          account: Account;
      }
  }
} 