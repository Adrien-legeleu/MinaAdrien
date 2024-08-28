import { type Response, type Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GroupModel, IGroup } from "../model/group.model";
import { IUser, UserModel } from "../model/user.model";

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
  static getTokenUser(user: IUser) {
    const jwtSecret = process.env.JWT_KEY ?? "";
    if (!jwtSecret) {
      throw new Error("jwt secret is not defined");
    }

    return jwt.sign(
      {
        userId: user._id,
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
      const { userId } = req.params;

      if (!groupname || !password) {
        res.status(401).send({
          error: "groupname or password are incorrect",
        });
        return;
      }

      if (!userId) {
        res.status(404).send({
          error: "userid not found",
        });
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
      const { userId } = req.params;

      if (!groupname || !password) {
        res.status(404).send({
          error: "Missing properties",
        });
        return;
      }

      if (!userId) {
        res.status(404).send({
          error: "userid not found",
        });
      }

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = bcrypt.hashSync(password, salt);

      const group = await GroupModel.create({
        groupname,
        password: hashPassword,
      });

      group.members.push;

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
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(401).send({
          error: "Password or username are incorrects",
        });
      }
      const user = await UserModel.findOne({ username });

      if (!user) {
        res.status(401).send({
          error: "username or password are incorrect",
        });
        return;
      }

      const isCorrectedPassword = bcrypt.compareSync(password, user.password);
      if (!isCorrectedPassword) {
        res.status(401).send({
          error: "username or password are incorrect",
        });
        return;
      }

      user.password = "";
      const authToken = AuthController.getTokenUser(user);

      res.status(200).send({ user, authToken });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        res.status(404).send({
          error: "Properties not found",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await UserModel.create({
        email,
        username,
        password: hashedPassword,
      });

      user.password = "";

      const authToken = AuthController.getTokenUser(user);

      res.status(200).send({ user, authToken });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async choosePseudo(req: any, res: Response): Promise<void> {
    try {
      const { userId, groupId } = req.params;
      const { pseudo } = req.body;

      if (!userId || !groupId) {
        res.status(404).send({
          error: "Properties not found",
        });
      }
      const group = await GroupModel.findById({ groupId });
      if (!group) {
        res.status(404).send({
          error: "group not found",
        });
        return;
      }

      group.members.push({ pseudo, userid });
    } catch (error) {}
  }
}
