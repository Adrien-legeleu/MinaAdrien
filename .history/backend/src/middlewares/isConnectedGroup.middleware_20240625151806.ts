import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class IsGroupConnectedMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      const groupTokenHeader = req.headers["group-authorization"];

      if (!groupTokenHeader) {
        res.status(401).send({
          error: "No group token",
        });
        return;
      }

      const groupToken = groupTokenHeader as string;
      const token = groupToken.split(" ")[1];

      if (!token) {
        res.status(401).send({
          error: "Invalid group token format",
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

      // TypeScript should recognize req.group here
      req.group = jwt.verify(token, jwtSecret);
      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
