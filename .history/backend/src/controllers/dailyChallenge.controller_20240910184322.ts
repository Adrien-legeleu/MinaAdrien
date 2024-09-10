import { type Response } from "express";
import { DailyChallengeModel } from "../model";

export class DailyChallengeController {
  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { emoji } = req.body;

      if (!userId || !emoji) {
        res.status(400).send({
          error: "userId or emoji not found",
        });
        return;
      }

      // Trouve le défi quotidien de l'utilisateur
      const userDailyChallenge = await DailyChallengeModel.findOne({ userId });

      if (!userDailyChallenge) {
        res.status(404).send({
          error: "userDailyChallenge not found",
        });
        return;
      }

      // Mise à jour de l'état de l'utilisateur
      const updatedEmojisDaysConnected = {
        ...userDailyChallenge.emojisDaysConnected,
      };
      if (updatedEmojisDaysConnected[emoji]) {
        updatedEmojisDaysConnected[emoji][1] += 1;
      } else {
        updatedEmojisDaysConnected[emoji] = [0, 1]; // Initialise le compteur pour ce nouvel emoji
      }

      userDailyChallenge.connectedThisDay = true;
      userDailyChallenge.emoji = emoji;
      userDailyChallenge.emojisDaysConnected = updatedEmojisDaysConnected;
      userDailyChallenge.daysConnected += 1;

      await userDailyChallenge.save();

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
        res.status(400).send({
          error: "userId or emoji not found",
        });
        return;
      }

      const existingChallenge = await DailyChallengeModel.findOne({ userId });

      if (existingChallenge) {
        res.status(400).send({
          error: "User daily challenge already exists",
        });
        return;
      }

      const arrayEmoji = {
        [emoji]: [0, 1], // Initialise le compteur pour cet emoji
      };

      const newDailyChallenge = new DailyChallengeModel({
        userId,
        connectedThisDay: true,
        emoji,
        emojisDaysConnected: arrayEmoji,
        daysConnected: 1, // Initialise le compteur de jours
      });

      await newDailyChallenge.save();

      res.status(201).send(newDailyChallenge);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
