import { type Response, type Request } from "express";

export class AuthController {
  async Login(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password } = req.body;

      if (!groupname || !password) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
