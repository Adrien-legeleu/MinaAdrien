import { error } from "console";
import { type Response } from "express";

export class DailyChallengeController {
  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
        const {userId} = req.params
        const {emoji} =req.body

        if (!userId || !emoji) {
            res.status(404).send({
                error: "userId or emoji not found"
            })
            return
        }
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
  }
}
