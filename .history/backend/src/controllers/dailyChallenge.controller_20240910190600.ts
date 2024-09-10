import { type Response } from "express";
import { DailyChallengeModel } from "../model";



export class DailyChallengeController {
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

    
    try {

  userDailyChallenge.connectedThisDay = true;
  userDailyChallenge.emoji = emoji;
  userDailyChallenge.daysConnected += 1


  await userDailyChallenge.save();

  // Envoie la réponse
  res.status(200).send(userDailyChallenge);
} catch (error: any) {
      console.error(error);
      res.status(500).send({
        error: error?.message,
      })
    }}



  async createUserDailyChallenge(req:any , res:Response) : Promise<void> {
    try {
        const {userId} = req.params
        const {emoji} =req.body



        if (!userId || !emoji) {
            res.status(404).send({
                error: "userId or emoji not found"
            })
            return
        }
        let arrayEomji =[
      { 0: 0 },
      { 1: 0 },
      { 2: 0 },
      { 3: 0 },
      { 4: 0 },
    ],
    arrayEmoji[emoji][1] = 1
          const userDailyChallenge = await DailyChallengeModel.create({
             userId
        }, {
            connectedThisDay:true,
            emoji,
            emojisDaysConnected :   arrayEmoji ,
            daysConnected : daysConnected +1
        })
        if (!userDailyChallenge) {
             res.status(404).send({
                error: "userDailyChallenge not found"
            })
            return
        }
        res.status(200).send(userDailyChallenge)
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
        
    }
  }
}
