import { type Response, type Request } from "express";
import bcrypt from "bcrypt";
import { GroupModel } from "../model/group.model";

export class AuthController {
  async Login(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password } = req.body;

      if (!groupname || !password) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
        return;
      }

      const group = await GroupModel.findOne({ groupname });

      if (!group) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
        return;
      }

      const isCorrectedPassword = bcrypt.compareSync(password, group.password);
      if (!isCorrectedPassword) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
        return;
      }

      group.password = "";

      res.status(200).send(group);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
      return;
    }
  }

  async Register(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password } = req.body;

      if (!groupname || !password) {
        res.status(40).send({
          error: "Missing properties",
        });
        return;
      }

      const group = await GroupModel.create({ groupname, groupname });

      if (!group) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
        return;
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
