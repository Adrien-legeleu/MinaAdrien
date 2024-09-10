import { type Response } from "express";

export class DailyChallengeController {
  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
        const {userId} = req.params
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
  }
}
