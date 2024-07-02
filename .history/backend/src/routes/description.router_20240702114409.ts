import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { descriptionController } from "../controllers";

const descriptionRouter = express.Router();

descriptionRouter
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll);
