import express from "express";

import { subscriptionController } from "../controllers";

const subscriptionRouter = express.Router();

subscriptionRouter
  .post(
    "/save-subscription",

    subscriptionController.createSubscription
  )
  .patch(
    "/remove-subscription/:userId",
    subscriptionController.removeSubscription
  );

export default subscriptionRouter;
