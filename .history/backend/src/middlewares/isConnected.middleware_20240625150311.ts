import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class IsUserConnectedMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      const userTokenHeader = req.headers["user-authorization"];

      if (!userTokenHeader) {
        res.status(401).send({
          error: "No user token",
        });
        return;
      }

      const userToken = userTokenHeader as string;
      const token = userToken.split(" ")[1];

      if (!token) {
        res.status(401).send({
          error: "Invalid user token format",
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

      req.user = jwt.verify(token, jwtSecret);

      next();
    } catch (error: any) {
      console.log(error);
      res.status(401).send({
        error: error?.message,
      });
    }
  }
}
