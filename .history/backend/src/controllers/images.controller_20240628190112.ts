import { type Response } from "express";
import { ImageModel } from "../model";

export class ImageController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const images = await ImageModel.find(groupId);

      res.status(200).send(images);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async findById(req: any, res: Response): Promise<void> {
    try {
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
}
