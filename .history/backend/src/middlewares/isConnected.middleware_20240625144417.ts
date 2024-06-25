import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class IsUserConnectedMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      const userToken =
        req.headers["user-authorization"]?.split(" ")?.[1] || "";

      if (!userToken) {
        res.status(401).send({
          error: "No user token",
        });
        return;
      }

      const jwtSecret = process.env.JWT_KEY ?? "";

      if (!jwtSecret) {
        res.status(500).send({
          error: "JWT secret is not defined",
        });
        return;
      }
      req.user = jwt.verify(userToken, jwtSecret);

      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
