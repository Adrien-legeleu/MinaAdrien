import { type Response } from "express";
import { DescriptionModel } from "../model";

export class DescriptionController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const description = await DescriptionModel.find(groupId);
      res.status(200).send(description);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async findOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const { descriptionId } = req.params;
      const description = await DescriptionModel.findOne({
        groupId,
        _id: descriptionId,
      });
      if (!description) {
        res.status(404).send({
          error: "description not found" + descriptionId,
        });
        return;
      }
      res.status(200).send(description);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async create(req: any, res: Response): Promise<void> {
    try {
      const { groupId, title, text, url_images, isLiked } = req.body;

      if (!groupId || !title || !text || !url_images || !isLiked) {
        res.status(404).send({
          error:
            "properties not found (groupdId or title or text or url_images or isLiked)",
        });
        return;
      }

      const description = await DescriptionModel.create({
        groupId,
        title,
        text,
        url_images,
        isLiked,
      });

      res.status(200).send(description);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId, title, text, url_images, isLiked } = req.body;
      const { descriptionId } = req.params;

      if (!descriptionId) {
        res.status(404).send({
          error: "description  not found" + descriptionId,
        });
        return;
      }
      if (!groupId || !title || !text || !url_images || !isLiked) {
        res.status(404).send({
          error:
            "properties not found (groupdId or title or text or url_images or isLiked)",
        });
        return;
      }
      const description = await DescriptionModel.findOneAndUpdate(
        {
          groupId,
          _id: descriptionId,
        },
        {
          ...(title ? { title } : {}),
          ...(text ? { text } : {}),
          ...(url_images ? { url_images } : {}),
          ...(isLiked ? { isLiked } : {}),
        }
      );

      if (!description) {
        res.status(404).send({
          error: "description not found" + descriptionId,
        });
        return;
      }
      res.status(200).send(description);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const { descriptionId } = req.params;
      const description = await DescriptionModel.findOneAndDelete({
        groupId,
        _id: descriptionId,
      });
      if (!description) {
        res.status(404).send({
          error: "description not found" + descriptionId,
        });
        return;
      }
      res.status(200).send(description);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
