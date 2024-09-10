import { type Response } from "express";

export class DailyChallengeController {
  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
    } catch (error) {
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
