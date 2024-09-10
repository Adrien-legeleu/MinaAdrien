import { type Response } from "express";
import { DescriptionModel, GroupModel, SubscriptionModel } from "../model";
import webpush from "web-push";
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY,
};

if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  throw new Error("VAPID keys are missing");
}

webpush.setVapidDetails(
  "mailto:mail@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

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
          error: "description not found " + descriptionId,
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

      console.log(groupId, description);

      if (!groupId || !description) {
        res.status(404).send({
          error: "properties not found (groupId or description or images)",
        });
        return;
      }

      // Création de la description
      const newDescription = await DescriptionModel.create({
        groupId,
        images,
        description,
      });
      console.log("Nouvelle description créée:", newDescription);

      // Récupération des abonnés
      const subscriptions = await SubscriptionModel.find({
        groupId: { $in: [groupId] },
      });
      console.log("Abonnés trouvés:", subscriptions);

      const group = await GroupModel.findOne({ _id: groupId });
      if (!group) {
        res.status(404).send({
          error: "group not found " + groupId,
        });
        return;
      }

      const logoUrl =
        "https://res.cloudinary.com/lovnia/image/upload/v1725815072/Lovna-logo_ijfrd7.png";

      subscriptions.forEach((sub: any) => {
        const pushSubscription = sub.subscription;
        const payload = JSON.stringify({
          notification: {
            title: "Nouvelle image ajoutée",
            body: "Une nouvelle image a été ajoutée dans votre groupe !",
            icon: logoUrl, // Icône affichée avec la notification
            image: logoUrl, // Image à afficher dans la notification
          },
        });
        console.log(
          "Payload de la notification:",
          Buffer.byteLength(payload, "utf8") // Vous n'avez pas besoin de convertir le payload en JSON une deuxième fois ici
        );

        webpush
          .sendNotification(pushSubscription as any, payload)
          .catch((error) => {
            console.error("Erreur lors de l'envoi de la notification", error);
          });
      });

      console.log("Notifications envoyées avec succès.");
      res.status(200).send(newDescription);
    } catch (error: any) {
      console.error("Erreur lors de la création de la description:", error);
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
          error: "description not found" + descriptionId,
        });
        return;
      }
      if (!groupId || !description) {
        res.status(404).send({
          error: "properties not found (groupId or description or images)",
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
      console.log(descriptionId);

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
