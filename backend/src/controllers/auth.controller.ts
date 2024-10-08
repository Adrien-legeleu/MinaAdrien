import { type Response, type Request } from "express";

import jwt from "jsonwebtoken";
import { GroupModel } from "../model/group.model";
import { IUser, UserModel } from "../model/user.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export class AuthController {
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
    res.status(200).json({
      message: "Token is valid",
      user: req.user ? { ...req.user } : null,
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { groupCode, userId } = req.body;

      if (!groupCode || !userId) {
        res.status(401).send({
          error: "Groupname, groupCode are incorrect",
        });
        return;
      }

      const group = await GroupModel.findOne({ groupCode });

      if (!group) {
        res.status(401).send({
          error: "groupCode are incorrect",
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
          });
          group.members.push({
            userId: user._id,
          });
          await user.save();
          await group.save();
        } else {
          res.status(409).send({
            error: "vous appartenez déja à ce groupe",
          });
          return;
        }
      }

      const isMember = group.members.some(
        (member) => member.userId.toString() === userId
      );
      if (isMember) {
        res.status(200).send({ group });
        return;
      } else {
        res.status(409).send({
          error: "vous apppartenez déja à ce groupe",
        });
        return;
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
      const { groupname, userId } = req.body;

      if (!groupname || !userId) {
        res.status(404).send({
          error: "Missing properties",
        });
        return;
      }
      const groupName = groupname;

      const group = await GroupModel.create({
        groupName: groupName,
        urlProfil: "",
        groupCode: crypto.randomBytes(5).toString("hex"),
        members: [
          {
            userId: userId,
          },
        ],
      });

      const user = await UserModel.findOne({ _id: userId });

      if (user) {
        user.groups.push({
          groupId: group._id,
        });
        await user.save();
      }

      res.status(200).send({ group, user });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      const { groupId, userId } = req.params;

      if (!groupId || !userId) {
        res.status(404).send({
          error: "Missing properties",
        });
        return;
      }

      const user = await UserModel.findOne({ _id: userId });

      if (user) {
        user.groups = user.groups.filter((group) => group.groupId !== groupId);
        await user.save();
      }
      const group = await GroupModel.findOneAndDelete({ _id: groupId });
      if (!group) {
        res.status(404).send({
          error: "group not found " + groupId,
        });
        return;
      }

      res.status(200).send(group);
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

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(404).send({
          error: "UserId not found",
        });
        return;
      }
      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        res.status(404).send({
          error: "User not found",
        });
        return;
      }
      res.status(200).send(user);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
