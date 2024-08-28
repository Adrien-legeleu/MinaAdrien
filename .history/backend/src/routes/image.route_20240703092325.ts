import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { imageController } from "../controllers";

const imageRouter = express.Router();

imageRouter
  .get("/", isConnectedMiddleware.execute, imageController.findAll)
  .get("/:imageId", isConnectedMiddleware.execute, imageController.findById)
  .post("/", isConnectedMiddleware.execute, imageController.create)
  .patch(
    "/imageId",
    isConnectedMiddleware.execute,
    imageController.updateOneById
  )
  .delete("/:imageId", isConnectedMiddleware.execute, imageController.delete);

export default imageRouter;
