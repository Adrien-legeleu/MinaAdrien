import { type Response } from "express";

import { cloudinary } from "../utils";
import { IImage, SubscriptionModel, ThemeModel } from "../model";
import webpush from "web-push";

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
            photoDate: image.datePhoto,
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

        const subscriptions = await SubscriptionModel.find({
          groupId: { $in: [groupId] }, // Recherche où `groupId` contient l'ID du groupe
        });

        console.log(subscriptions);

        subscriptions.forEach((sub: any) => {
          const pushSubscription = sub.subscription;
          const payload = JSON.stringify({
            title: "Nouveau thème ajoutée",
            body: "Un nouveau thème a été ajoutée dans votre groupe !",
          });

          webpush
            .sendNotification(pushSubscription as any, payload)
            .catch((error) => {
              console.error("Erreur lors de l'envoi de la notification", error);
            });
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

      console.log(images);

      if (!groupId || !images || !themeId) {
        res.status(400).send({
          error: "Missing required fields: groupId, images, title, or themeId",
        });
        return;
      }
      const theme = await ThemeModel.findOneAndUpdate(
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
      const subscriptions = await SubscriptionModel.find({
        groupId: { $in: [groupId] }, // Recherche où `groupId` contient l'ID du groupe
      });

      console.log(subscriptions);

      // Envoyer des notifications push à chaque abonné trouvé
      subscriptions.forEach((sub: any) => {
        const pushSubscription = sub.subscription;
        const payload = JSON.stringify({
          title: `Le thème ${title} a été modifié`,
          body: `Votre thème ${title} a été modifier !!`,
        });

        webpush
          .sendNotification(pushSubscription as any, payload)
          .catch((error) => {
            console.error("Erreur lors de l'envoi de la notification", error);
          });
      });
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
