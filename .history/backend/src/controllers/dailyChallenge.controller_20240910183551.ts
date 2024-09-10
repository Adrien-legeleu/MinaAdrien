import { error } from "console";
import { type Response } from "express";
import { DailyChallengeModel } from "../model";

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
        const userDailyChallenge = await DailyChallengeModel.findOneAndUpdate({
             userId
        }, {
            connectedThisDay:true,
            emoji,
            emojisDaysConnected[emoji][1] :   emojisDaysConnected[emoji][1] + 1 ,
            daysConnected : daysConnected +1

        })
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
  }
}
