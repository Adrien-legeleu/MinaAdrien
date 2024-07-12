import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { themeController } from "../controllers";

const themeRouter = express.Router();

themeRouter
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/", isConnectedMiddleware.execute, themeController.findAll);

export default themeRouter;
