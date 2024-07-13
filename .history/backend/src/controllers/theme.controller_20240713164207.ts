import { type Response } from "express";

import { cloudinary } from "../utils";
import { IImage, ThemeModel } from "../model";

export class ThemeController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      if (!groupId) {
        res.status(404).send({
          error: "groupId not found",
        });
        return;
      }
      const themes = await ThemeModel.find({ groupId });

      res.status(200).send(themes);
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
      const { themeId } = req.params;
      console.log(groupId, themeId);

      const theme = await ThemeModel.findOne({
        _id: themeId,
        groupId,
      });

      if (!theme) {
        res.status(404).send({
          error: "product not found :" + themeId,
        });
      }

      res.status(200).send(theme);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }

  async create(req: any, res: Response): Promise<void> {
    try {
      const { groupId, images, title, bio, isLiked } = req.body;

      if (!groupId || !images || !title) {
        res.status(404).send({
          error: "groupdId or images or title are not found",
        });
        return;
      }

      let uploadedImages: IImage[] = [];

      for (const image of images) {
        const uploadRes = await cloudinary.uploader.upload(image.url, {
          upload_preset: "lovnia",
        });
        if (uploadRes) {
          uploadedImages.push({
            groupId: groupId,
            url: [uploadRes.secure_url],
            legend: image.legend,
            datePhoto: image.datePhoto,
            isLiked: image.isLiked,
          });
        }
      }

      if (uploadedImages.length > 0) {
        const theme = await ThemeModel.create({
          groupId,
          images: uploadedImages,
          title,
          bio,
          isLiked,
        });

        res.status(200).send(theme);
      } else {
        res.status(400).send({
          error: "No images were uploaded successfully",
        });
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        error: err?.message,
      });
    }
  }

  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { themeId } = req.params;
      const { groupId, images, title, bio, isLiked } = req.body;

      console.log(title);

      if (!groupId || !images || !title || !themeId) {
        return res.status(400).send({
          error: "Missing required fields: groupId, images, title, or themeId",
        });
        return;
      }
      const theme = await ThemeModel.create(
        { groupId, _id: themeId },
        {
          ...(images ? { images } : {}),
          ...(title ? { title } : {}),
          ...(bio ? { bio } : {}),
          ...(isLiked ? { isLiked } : {}),
        }
      );
      if (!theme) {
        res.status(404).send({
          error: "image not found" + themeId,
        });
      }
      console.log(theme);

      res.status(200).send(theme);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const { themeId } = req.params;

      const theme = await ThemeModel.findOneAndDelete({
        _id: themeId,
        groupId,
      });

      if (!theme) {
        res.status(404).send({
          error: "product not found :" + themeId,
        });
      }

      res.status(200).send(theme);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
}
