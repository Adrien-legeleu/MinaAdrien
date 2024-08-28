import { type Response, type Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GroupModel, IGroup } from "../model/group.model";
import { IUser, UserModel } from "../model/user.model";
import crypto from "crypto";

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

  checkToken(req: Request, res: Response): void {
    res.status(200).send(req);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { password, userId } = req.body;

      if (!password || !userId) {
        res.status(401).send({
          error: "Groupname, password are incorrect",
        });
        return;
      }

      const group = await GroupModel.findOne({ password });

      if (!group) {
        res.status(401).send({
          error: "password are incorrect",
        });
        return;
      }

      const user = await UserModel.findOne({ _id: userId });

      if (user) {
        const isGroupsUser = user.groups.some(
          (groupUser) => groupUser.groupId === group._id
        );
        if (!isGroupsUser) {
          user.groups.push({
            groupId: group._id,
            groupCode: group.password,
            groupName: group.groupname,
            urlProfil: group.profilPhoto,
          });
        }
      }

      const isMember = group.members.some(
        (member) => member.userId.toString() === userId
      );
      const authToken = AuthController.getTokenGroup(group);
      if (isMember) {
        res.status(200).send({ group, authToken, redirect: "HomePage", user });
      } else {
        res
          .status(200)
          .send({ group, authToken, redirect: "choosePseudoPage", user });
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
      const { groupname, userId, pseudo } = req.body;

      if (!groupname || !userId) {
        res.status(404).send({
          error: "Missing properties",
        });
        return;
      }

      const group = await GroupModel.create({
        groupname,
        password: crypto.randomBytes(5).toString("hex"),
        members: [{ pseudoUser: pseudo, userId }],
      });

      const user = await UserModel.findOne({ _id: userId });

      if (user) {
        user.groups.push({
          groupId: group._id,
          groupCode: group.password,
          groupName: groupname,
          urlProfil: group.profilPhoto,
        });
        await user.save();
      }

      const authToken = AuthController.getTokenGroup(group);

      res.status(200).send({ group, authToken, user });
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

      console.log(username, password);

      const user = await UserModel.findOne({ username });

      if (!user) {
        res.status(401).send({
          error: "Username or password are incorrect",
        });
        return;
      }
      console.log(user);

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

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      console.log(userId);

      if (!userId) {
        res.status(400).send({
          error: "userId not found in request body",
        });
        return;
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(404).send({
          error: "user not found",
        });
        return;
      }

      res.status(200).send(user);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message || "Internal server error",
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

      group.members.map((member) => {
        if (member.userId === userId) {
          res.status(409).send({
            error: "userId even existed",
          });
        }
        return;
      });

      group.members.push({
        pseudoUser,
        userId,
      });

      await group.save();

      res.status(200).send(group);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
