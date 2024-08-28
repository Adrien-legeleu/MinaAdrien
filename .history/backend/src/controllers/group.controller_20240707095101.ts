import { type Response, type Request } from "express";
import { GroupModel } from "../model/group.model";

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
}
