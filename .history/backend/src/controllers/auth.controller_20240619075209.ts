import { type Response, type Request } from "express";

export class AuthController {
  async Login(req: Request, res: Response): Promise<void> {
    try {
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
