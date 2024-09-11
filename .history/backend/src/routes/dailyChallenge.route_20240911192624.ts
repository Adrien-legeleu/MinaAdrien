import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { dailyChallengeController } from "../controllers";

const dailyChallengeRouter = express.Router();

dailyChallengeRouter
  .patch(
    "/choose/:userId",
    isConnectedMiddleware.execute,
    dailyChallengeController.chooseEmoji
  )

  .get(
    "/;userId",
    isConnectedMiddleware.execute,
    dailyChallengeController.findDailyUserChallenge
  );

export default dailyChallengeRouter;
