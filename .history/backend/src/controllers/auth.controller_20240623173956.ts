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
      const { groupname, password, userId } = req.body;

      if (!groupname || !password || !userId) {
        res.status(401).send({
          error: "Groupname, password are incorrect",
        });
        return;
      }

      const group = await GroupModel.findOne({ groupname });

      if (!group) {
        res.status(401).send({
          error: "Groupname or password are incorrect",
        });
        return;
      }

      const isCorrectedPassword = bcrypt.compareSync(password, group.password);
      if (!isCorrectedPassword) {
        res.status(401).send({
          error: "Groupname or password are incorrect",
        });
        return;
      }

      const isMember = group.members.some(
        (member) => member.userId.toString() === userId
      );
      if (isMember) {
        const authToken = AuthController.getTokenGroup(group);
        res.status(200).send({ group, authToken, redirect: "groupPage" });
      } else {
        res.status(200).send({ redirect: "choosePseudoPage" });
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { groupname, password, userId } = req.body;

      if (!groupname || !password || !userId) {
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
        members: [{ pseudoUser: "", userId }], // Ajoute l'utilisateur comme membre lors de la création
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
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(401).send({
          error: "Password or username are incorrects",
        });
        return;
      }

      const user = await UserModel.findOne({ username });

      if (!user) {
        res.status(401).send({
          error: "Username or password are incorrect",
        });
        return;
      }

      const isCorrectedPassword = bcrypt.compareSync(password, user.password);
      if (!isCorrectedPassword) {
        res.status(401).send({
          error: "Username or password are incorrect",
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
        return;
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

  async choosePseudo(req: Request, res: Response): Promise<void> {
    try {
      const { pseudoUser, userId, groupId } = req.body;
      console.log(pseudoUser, groupId, userId);

      if (!userId || !groupId || !pseudoUser) {
        res.status(404).send({
          error: "Properties not found",
        });
        return;
      }

      const group = await GroupModel.findById(groupId);
      if (!group) {
        res.status(404).send({
          error: "Group not found",
        });
        return;
      }

      group.members.push({
        pseudoUser,
        userId,
      });

      await group.save(); // Sauvegarder les modifications

      res.status(200).send(group);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
