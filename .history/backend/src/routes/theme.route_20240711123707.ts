import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { themeController } from "../controllers";

const themeRouter = express.Router();

themeRouter
  .get("/", isConnectedMiddleware.execute, themeController.findAll)
  .get("/:themeId", isConnectedMiddleware.execute, themeController.findById)
  .post("/", isConnectedMiddleware.execute, themeController.create)
  .patch(
    "/:themeId",
    isConnectedMiddleware.execute,
    themeController.updateOneById
  )
  .delete("/:themeId", isConnectedMiddleware.execute, themeController.delete);

export default themeRouter;
