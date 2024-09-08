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

      await SubscriptionModel.findOneAndDelete({ userId });

      res.status(200).send({ message: "Abonnement supprimé" });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error.message,
      });
    }
  }
  async checkSubscriptions(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const subscriptionUser = await SubscriptionModel.findOne({ userId });
      if (!subscriptionUser) {
        res.status(200).send(false);
      }
      res.status(200).send(true);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.mesage,
      });
    }
  }
}
