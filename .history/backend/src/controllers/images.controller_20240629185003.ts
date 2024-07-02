import { type Response } from "express";
import { ImageModel } from "../model";

export class ImageController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      if (!groupId) {
        res.status(404).send({
          error: "groupId not found",
        });
        return;
      }
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
      const { groupId } = req.body;
      if (!groupId) {
        res.status(404).send({
          error: "groupId not found",
        });
        return;
      }
      const { imageId } = req.params;
      const image = await ImageModel.findOne({ imageId, groupId });
      if (!image) {
        res.status(404).send({
          error: "image not found : " + imageId,
        });
        return;
      }
      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async create(req: any, res: Response): Promise<void> {
    try {
      const { groupId, url, legend, photoDate, isLiked } = req.body;
      const { imageId } = req.params;

      if (!groupId || !url || !legend || !photoDate || !isLiked) {
        res.status(404).send({
          error: "groupdId or legend or photoDate or isLiked are not found",
        });
        return;
      }
      const image = await ImageModel.create({
        imageId,
        groupId,
        url,
        legend,
        photoDate,
        isLiked,
      });

      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId, url, legend, photoDate, isLiked } = req.body;
      const { imageId } = req.params;

      if (!groupId || !url || !legend || !photoDate || !isLiked) {
        res.status(404).send({
          error: "groupdId or legend or photoDate or isLiked are not found",
        });
        return;
      }
      const image = await ImageModel.create(
        { groupId, _id: imageId },
        {
          ...(url ? { url } : {}),
          ...(legend ? { legend } : {}),
          ...(photoDate ? { photoDate } : {}),
          ...(isLiked ? { isLiked } : {}),
        }
      );
      if (!image) {
        res.status(404).send({
          error: "image not found" + imageId,
        });
      }

      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const { imageId } = req.params;

      const image = await ImageModel.findOneAndDelete({
        _id: imageId,
        groupId,
      });

      if (!image) {
        res.status(404).send({
          error: "product not found :" + imageId,
        });
      }

      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
}
