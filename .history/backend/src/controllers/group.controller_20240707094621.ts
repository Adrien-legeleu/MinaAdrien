import { type Response, type Request } from "express";
import { GroupModel, IGroup } from "../model/group.model";
import { UserModel } from "../model/user.model";

export class AuthController {
  async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const group = await GroupModel.findOne(groupId);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
