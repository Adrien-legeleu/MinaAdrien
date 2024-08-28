import { type Response, type Request } from "express";
import { GroupModel } from "../model/group.model";

export class AuthController {
  async Login(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password } = req.body;

      if (!groupname || !password) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
      }

      const group = await GroupModel.findOne({ groupname });

      if (!group) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
      return;
    }
  }
}
