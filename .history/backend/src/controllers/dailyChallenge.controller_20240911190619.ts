import { type Response } from "express";
import { DailyChallengeModel, SubscriptionModel } from "../model";
import schedule from "node-schedule"; // Importez node-schedule pour la tâche CRON

export class DailyChallengeController {
  static scheduleDailyChallenge() {
    schedule.scheduleJob("0 0 * * *", async () => {
      await DailyChallengeController.setRandomTimeForAllUsers;
    });
  }

  static async setRandomTimeForAllUsers() {
    try {
      const users = await SubscriptionModel.find({});
      for (const user of users) {
        const randomHour = 19 + Math.floor(Math.random() * 3);
        const randomMinute = Math.floor(Math.random() * 60);
      }
    } catch (error) {}
  }

  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { emoji } = req.body;

      if (!userId || !emoji) {
        res.status(400).send({
          error: "userId or emoji not found or invalid",
        });
        return;
      }

      const userDailyChallenge = await DailyChallengeModel.findOne({ userId });

      if (!userDailyChallenge) {
        res.status(404).send({
          error: "userDailyChallenge not found",
        });
        return;
      }

      userDailyChallenge.connectedThisDay = true;
      userDailyChallenge.emoji = emoji;
      userDailyChallenge.daysConnected += 1;

      await userDailyChallenge.save();

      // Envoie la réponse
      res.status(200).send(userDailyChallenge);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async createUserDailyChallenge(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { emoji } = req.body;

      if (!userId || !emoji) {
        res.status(404).send({
          error: "userId or emoji not found",
        });
        return;
      }

      const userDailyChallenge = await DailyChallengeModel.create({
        connectedThisDay: true,
        emoji,
        userId,
        daysConnected: 1,
      });
      if (!userDailyChallenge) {
        res.status(404).send({
          error: "userDailyChallenge not found",
        });
        return;
      }
      res.status(200).send(userDailyChallenge);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async findDailyUserChallenge(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const userDailyChallenge = await DailyChallengeModel.findOne({ userId });
      if (!userDailyChallenge) {
        res.status(200).send(false);
        return;
      } else {
        res.status(200).send(true);
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
