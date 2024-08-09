import { type Response, type Request } from "express";
import { GroupModel } from "../model/group.model";
import { log } from "console";

export class GroupController {
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
  async updateOneById(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const { groupname, profilPhoto } = req.body;
      const group = await GroupModel.findOneAndUpdate(
        { _id: groupId },
        {
          ...(groupname ? { groupname } : {}),
          ...(profilPhoto ? { profilPhoto } : {}),
        }
      );
      if (!group) {
        res.status(404).send({
          error: "group not found" + groupId,
        });

        return;
      }
      console.log(group);
      res.status(200).send(group);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
