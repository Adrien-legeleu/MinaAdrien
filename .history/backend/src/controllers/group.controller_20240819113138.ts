import { type Response, type Request } from "express";
import { GroupModel } from "../model/group.model";

export class GroupController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const group = await GroupModel.find();
      if (!group) {
        res.status(404).send({
          error: "group not found",
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
  async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const group = await GroupModel.findOne({ _id: groupId });
      if (!group) {
        res.status(404).send({
          error: "group not found" + groupId,
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

  async updateGroupOneById(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const { groupName, urlProfil } = req.body;

      console.log(
        "eizoiezoieoeiozeizoiezoeizoeizoeizoeizoeizoeizoeiozeizoioieoeiezoieoz"
      );

      console.log(groupName, urlProfil, groupId);

      const group = await GroupModel.findOneAndUpdate(
        { _id: groupId },
        {
          ...(groupName ? { groupName } : {}),
          ...(urlProfil ? { urlProfil } : {}),
        },
        { new: true }
      );
      if (!group) {
        res.status(401).send({
          error: "groupId is incorrect",
        });
        return;
      }
      console.log(group);

      res.status(200).send(group);
    } catch (err: any) {
      console.error(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
