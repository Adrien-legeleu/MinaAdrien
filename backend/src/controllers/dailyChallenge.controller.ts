import { type Response } from "express";
import { DailyChallengeModel, SubscriptionModel } from "../model";
import schedule from "node-schedule"; // Importez node-schedule pour la tâche CRON
import webpush from "web-push";

export class DailyChallengeController {
  static scheduleDailyChallenge() {
    schedule.scheduleJob(
      { hour: 17, minute: 0, tz: "Europe/Paris" }, // Changez l'heure à 17h et ajoutez 'tz: "Europe/Paris"'
      async () => {
        console.log(
          "Exécution de la tâche programmée à 17h, heure de Paris..."
        );
        await DailyChallengeController.setRandomTimeForAllUsers();
      }
    );
  }

  // Méthode pour définir une heure aléatoire pour tous les utilisateurs
  static async setRandomTimeForAllUsers() {
    try {
      const users = await SubscriptionModel.find({});
      for (const user of users) {
        const randomHour = 19 + Math.floor(Math.random() * 3); // Heure entre 19h et 21h
        const randomMinute = Math.floor(Math.random() * 60); // Minute entre 0 et 59
        const randomTime = new Date();
        randomTime.setHours(randomHour, randomMinute, 0, 0);

        // Recherchez le challenge quotidien de l'utilisateur
        let userDailyChallenge = await DailyChallengeModel.findOne({
          userId: user.userId,
        });

        if (userDailyChallenge) {
          userDailyChallenge.connectedThisDay = false;
        } else {
          // Créez un nouveau challenge quotidien pour l'utilisateur
          userDailyChallenge = await DailyChallengeModel.create({
            userId: user.userId,
            connectedThisDay: false,
            emoji: 5, // Emoji par défaut, peut-être à changer selon vos besoins
            daysConnected: 0,
          });

          if (!userDailyChallenge) {
            console.error("Erreur lors de la création du userDailyChallenge");
            continue; // Passez au prochain utilisateur s'il y a une erreur
          }
        }

        // Planifiez l'envoi de la notification à l'heure choisie
        schedule.scheduleJob(randomTime, async () => {
          if (userDailyChallenge) {
            const pushSubscription = user.subscription;
            const payload = JSON.stringify({
              title: "Nouvelle image ajoutée",
              body: "Une nouvelle image a été ajoutée dans votre groupe !",
            });
            console.log(
              "Payload de la notification:",

              Buffer.byteLength(JSON.stringify(payload), "utf8")
            ); // Ajoutez cette ligne avant d'envoyer la notification

            webpush
              .sendNotification(pushSubscription as any, payload)
              .catch((error: any) => {
                console.error(
                  "Erreur lors de l'envoi de la notification",
                  error
                );
              });

            userDailyChallenge.connectedThisDay = true;
            await userDailyChallenge.save(); // Sauvegardez le changement
          }
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la définition de l'heure aléatoire pour les utilisateurs:",
        error
      );
    }
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
