import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { letterController } from "../controllers";

const letterRouter = express.Router();

letterRouter
  .get("/", isConnectedMiddleware.execute, letterController.findAll)
  .get(
    "/:letterId",
    isConnectedMiddleware.execute,
    letterController.findOneById
  )
  .post("/", isConnectedMiddleware.execute, letterController.create)
  .get(
    "/:letterId",
    isConnectedMiddleware.execute,
    letterController.updateOneById
  )
  .delete(":letterId/", isConnectedMiddleware.execute, letterController.delete);
