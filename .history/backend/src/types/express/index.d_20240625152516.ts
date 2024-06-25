import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload | Record<string, any>;
    group?: JwtPayload | Record<string, any>;
  }
}
