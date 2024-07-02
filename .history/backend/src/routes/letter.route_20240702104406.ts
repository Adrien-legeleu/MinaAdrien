import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { letterController } from "../controllers";

const letterRouter = express.Router();

letterRouter
  .get("/", isConnectedMiddleware.execute, letterController.findAll)
  .get("/", isConnectedMiddleware.execute, letterController.findAll)
  .get("/", isConnectedMiddleware.execute, letterController.findAll)
  .get("/", isConnectedMiddleware.execute, letterController.findAll)
  .get("/", isConnectedMiddleware.execute, letterController.findAll);
