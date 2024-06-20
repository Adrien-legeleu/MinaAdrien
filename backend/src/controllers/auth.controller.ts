import { type Response, type Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GroupModel, IGroup } from "../model/group.model";

export class AuthController {
  static getTokenGroup(group: IGroup) {
    const jwtSecret = process.env.JWT_KEY ?? "";
    if (!jwtSecret) {
      throw new Error("jwt secret is not defined");
    }

    return jwt.sign(
      {
        groupId: group._id,
      },
      jwtSecret,
      {
        expiresIn: "2d",
      }
    );
  }

  checkTokenGroup(req: Request, res: Response): void {
    res.status(200).send(req);
  }

  async login(req: Request, res: Response): Promise<void> {
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
      const authToken = AuthController.getTokenGroup(group);

      res.status(200).send({ group, authToken });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password } = req.body;

      if (!groupname || !password) {
        res.status(404).send({
          error: "Missing properties",
        });
        return;
      }
      const salt = bcrypt.genSaltSync(10);

      const hashPassword = bcrypt.hashSync(password, salt);

      const group = await GroupModel.create({
        groupname,
        password: hashPassword,
      });
      group.password = "";

      const authToken = AuthController.getTokenGroup(group);

      res.status(200).send({ group, authToken });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
