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
  .post(
    "/create",
    isConnectedMiddleware.execute,
    dailyChallengeController.createUserDailyChallenge
  )
  .get("/;userId");

export default dailyChallengeRouter;
