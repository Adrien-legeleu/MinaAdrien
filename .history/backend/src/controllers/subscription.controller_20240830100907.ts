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
  async updateSubscription(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { groupId } = req.body;
      const subscription = await SubscriptionModel.findOneAndUpdate(
        {
          userId,
        },
        {
          ...(groupId ? { groupId } : {}),
        }
      );
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error.message,
      });
    }
  }
}
