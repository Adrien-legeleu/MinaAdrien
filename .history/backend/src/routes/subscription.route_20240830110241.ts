import express from "express";

import { subscriptionController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const subscriptionRouter = express.Router();

subscriptionRouter
  .post(
    "/save-subscription",

    subscriptionController.createSubscription
  )
  .patch(
    "/update-subscription/:userId",

    subscriptionController.updateSubscription
  );

export default subscriptionRouter;
