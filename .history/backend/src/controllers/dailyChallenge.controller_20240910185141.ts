import { type Response } from "express";
import { DailyChallengeModel } from "../model";



export class DailyChallengeController {
  async chooseEmoji(req: any, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { emoji } = req.body;

      if (!userId || typeof emoji !== 'number') {
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

      // Clone le tableau emojisDaysConnected
      const updatedEmojisDaysConnected = userDailyChallenge.emojisDaysConnected.map((obj) => ({ ...obj }));

      // Assure que l'index emoji est dans les limites valides
      if (emoji >= 0 && emoji < updatedEmojisDaysConnected.length) {
        // Met à jour le compteur pour l'emoji choisi
        const currentCount = updatedEmojisDaysConnected[emoji][emoji] || 0;
        updatedEmojisDaysConnected[emoji] = { [emoji]: currentCount + 1 };
      } else {
        res.status(400).send({
          error: "Invalid emoji value",
        });
        return;
      }

      // Met à jour les champs de l'utilisateur
      userDailyChallenge.connectedThisDay = true;
      userDailyChallenge.emoji = emoji;
      userDailyChallenge.emojisDaysConnected = updatedEmojisDaysConnected;
      userDailyChallenge.daysConnected += 2; // Ajoute 2 au compteur de jours connectés

      await userDailyChallenge.save();

      res.status(200).send(userDailyChallenge);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}


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
