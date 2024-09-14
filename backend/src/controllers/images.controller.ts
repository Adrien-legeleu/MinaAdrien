import { type Response } from "express";
import { ImageModel, SubscriptionModel } from "../model";
import { cloudinary } from "../utils";
import webpush from "web-push";

export class ImageController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      if (!groupId) {
        res.status(404).send({
          error: "groupId not found",
        });
        return;
      }
      const images = await ImageModel.find({ groupId });

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
      const { imageId } = req.params;
      const image = await ImageModel.findOne({ _id: imageId });
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

      if (!groupId || !url) {
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
        const image = await ImageModel.create({
          groupId,
          url: uploadedImageUrls,
          legend,
          photoDate,
          isLiked,
        });

        const subscriptions = await SubscriptionModel.find({
          groupId: { $in: [groupId] }, // Recherche où `groupId` contient l'ID du groupe
        });

        console.log(uploadedImageUrls);

        // Envoyer des notifications push à chaque abonné trouvé
        subscriptions.forEach((sub: any) => {
          const pushSubscription = sub.subscription;
          const payload = JSON.stringify({
            title: "Nouvelle image ajoutée",
            body: "😉Une nouvelle image a été ajoutée dans votre groupe ! 🖐️",
          });
          console.log("Payload de la notification:", payload); // Vérifie ici

          webpush
            .sendNotification(pushSubscription as any, payload)
            .catch((error) => {
              console.error("Erreur lors de l'envoi de la notification", error);
            });
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
      const image = await ImageModel.findOneAndUpdate(
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
        return;
      }

      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { imageId } = req.params;

      const image = await ImageModel.findOneAndDelete({
        _id: imageId,
      });

      if (!image) {
        res.status(404).send({
          error: "product not found :" + imageId,
        });
        return;
      }

      res.status(200).send(image);
    } catch (err: any) {
      console.log(err);
      res.status(err?.message);
    }
  }
}
