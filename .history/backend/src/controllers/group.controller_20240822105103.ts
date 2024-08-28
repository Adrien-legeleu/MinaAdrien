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

      // Vérifiez que le groupId est fourni
      if (!groupId) {
        res.status(400).send({ error: "Group ID is required" });
        return;
      }

      // Vérifiez que le corps de la requête contient des données à mettre à jour
      if (!groupName && !urlProfil) {
        res.status(400).send({ error: "No update data provided" });
        return;
      }
      console.log("Request body:", req.body);

      const group = await GroupModel.findOneAndUpdate(
        { _id: groupId },
        {
          ...(groupName ? { groupName } : {}),
          ...(urlProfil ? { urlProfil } : {}),
        }
      );

      if (!group) {
        res.status(404).send({ error: "Group not found" });
        return;
      }

      res.status(200).send(group);
    } catch (err: any) {
      console.error(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
