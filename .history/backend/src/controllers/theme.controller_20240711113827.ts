import { type Response } from "express";

import { cloudinary } from "../utils";
import { ThemeModel } from "../model";

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
      if (!groupId) {
        res.status(404).send({
          error: "groupId not found",
        });
        return;
      }
      const { themeId } = req.params;
      const theme = await ThemeModel.findOne({ _id: themeId, groupId });
      if (!theme) {
        res.status(404).send({
          error: "theme not found : " + themeId,
        });
        return;
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
          error: "groupdId or url  are not found",
        });
        return;
      }

      let uploadedImageUrls: string[] = [];

      if (Array.isArray(url)) {
        for (const urlImage of url) {
          const uploadRes = await cloudinary.uploader.upload(urlImage, {
            upload_preset: "lovnia",
          });
          if (uploadRes) {
            uploadedImageUrls.push(uploadRes.secure_url);
          }
        }
      } else {
        const uploadRes = await cloudinary.uploader.upload(url, {
          upload_preset: "lovnia",
        });
        if (uploadRes) {
          uploadedImageUrls.push(uploadRes.secure_url);
        }
      }

      if (uploadedImageUrls.length > 0) {
        const image = await ThemeModel.create({
          groupId,
          url: uploadedImageUrls,
          legend,
          photoDate,
          isLiked,
        });

        res.status(200).send(image);
      }
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId, url, legend, photoDate, isLiked } = req.body;
      const { imageId } = req.params;

      if (!groupId || !url) {
        res.status(404).send({
          error: "groupdId or url are not found",
        });
        return;
      }
      const image = await ThemeModel.create(
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

      const image = await ThemeModel.findOneAndDelete({
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
