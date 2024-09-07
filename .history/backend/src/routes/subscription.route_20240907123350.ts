import express from "express";

import { subscriptionController } from "../controllers";

const subscriptionRouter = express.Router();

subscriptionRouter
  .post(
    "/save-subscription",

    subscriptionController.createSubscription
  )
  .delete(
    "/remove-subscription/:userId",
    subscriptionController.removeSubscription
  );

export default subscriptionRouter;
