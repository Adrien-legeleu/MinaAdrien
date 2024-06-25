import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class IsGroupConnectedMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      const groupToken =
        req.headers["group-authorization"]?.split(" ")?.[1] || "";

      if (!groupToken) {
        res.status(401).send({
          error: "No group token",
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
      req.group = jwt.verify(groupToken, jwtSecret);

      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
