import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { groupController } from "../controllers";
const groupRouter = express.Router();

groupRouter.get(
  "/",
  isConnectedMiddleware.execute,
  groupController.findOneById
);
