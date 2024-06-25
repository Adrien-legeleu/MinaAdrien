declare namespace Express {
  import { User } from "./app/entity/User";
  export interface Request {
    user?: User;
    // Alse tried as
    // user: string
    // user?: string
    // user: any ...
  }
}
