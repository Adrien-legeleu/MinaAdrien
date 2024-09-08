import { type Response } from "express";
import { DescriptionModel, GroupModel, SubscriptionModel } from "../model";
import webpush from "web-push";

export class DescriptionController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      console.log(groupId);
      const description = await DescriptionModel.find({ groupId });
      console.log(description);

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
      const { groupId, description, images } = req.body;

      if (!groupId || !description) {
        res.status(404).send({
          error: "properties not found (groupdId or description or images )",
        });
        return;
      }

      const newDescription = await DescriptionModel.create({
        groupId,
        images,
        description,
      });
      console.log(newDescription);
      const subscriptions = await SubscriptionModel.find({
        groupId: { $in: [groupId] }, // Recherche où `groupId` contient l'ID du groupe
      });

      console.log(subscriptions);

      const group = GroupModel.findOne({ _id: groupId });

      // Envoyer des notifications push à chaque abonné trouvé
      subscriptions.forEach((sub: any) => {
        const pushSubscription = sub.subscription;
        const payload = JSON.stringify({
          title: "Nouvelle description ajoutée",
          body: "Une nouvelle description a été ajoutée dans votre groupe !",
          icon: "https://your-server.com/path/to/your/icon.png",
          image: "https://your-server.com/path/to/your/image.jpg",
        });

        webpush
          .sendNotification(pushSubscription as any, payload)
          .catch((error) => {
            console.error("Erreur lors de l'envoi de la notification", error);
          });
      });

      res.status(200).send(newDescription);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId, images, description } = req.body;
      const { descriptionId } = req.params;

      if (!descriptionId) {
        res.status(404).send({
          error: "description  not found" + descriptionId,
        });
        return;
      }
      if (!groupId || !description) {
        res.status(404).send({
          error:
            "properties not found (groupdId or title or text or url_images or isLiked)",
        });
        return;
      }
      const newDescription = await DescriptionModel.findOneAndUpdate(
        {
          groupId,
          _id: descriptionId,
        },
        {
          ...(description ? { description } : {}),
          ...(images ? { images } : {}),
        }
      );

      if (!newDescription) {
        res.status(404).send({
          error: "description not found" + descriptionId,
        });
        return;
      }
      res.status(200).send(newDescription);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { descriptionId } = req.params;
      const description = await DescriptionModel.findOneAndDelete({
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
