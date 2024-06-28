import { type Response } from "express";
import { ImageModel } from "../model";

export class ImageController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = res.body;
      const images = await ImageModel.find;
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }
}
