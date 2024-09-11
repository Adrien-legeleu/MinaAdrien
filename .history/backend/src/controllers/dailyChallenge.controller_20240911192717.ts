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
        const randomTime = new Date();
        randomTime.setHours(randomHour, randomMinute, 0, 0);
        const userDailyChallenge = await DailyChallengeModel.findOne({
          userId: user.userId,
        });
        if (userDailyChallenge) {
          userDailyChallenge.connectedThisDay = false;
        } else {
          const userDailyChallenge = await DailyChallengeModel.create({
            userId: user.userId,
            connectedThisDay: false,
            emoji: 5,
            daysConnected: 0,
          });
          if (!userDailyChallenge) {
            resizeBy.status(404).send({
              error: "userDailyChallenge not found",
            });
            return;
          }
        }
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
