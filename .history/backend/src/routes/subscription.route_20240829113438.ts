import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { subscriptionController } from "../controllers";

const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/save-subscription",

  subscriptionController.createSubscription
);

export default subscriptionRouter;
