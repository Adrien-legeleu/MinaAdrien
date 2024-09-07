import { type Response } from "express";
import { SubscriptionModel } from "../model/notificationsMemberships.model";

export class SubscriptionController {
  async createSubscription(req: any, res: Response): Promise<void> {
    try {
      const { userId, groupId, subscription } = req.body;

      const subscriptionCreate = await SubscriptionModel.create({
        userId,
        groupId,
        subscription,
      });
      res.status(200).send(subscriptionCreate);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async removeSubscription(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      await SubscriptionModel.deleteOne({ userId });

      res.status(200).send({ message: "Abonnement supprimé" });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error.message,
      });
    }
  }
}
