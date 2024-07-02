import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { descriptionController } from "../controllers";

const descriptionRouter = express.Router();

descriptionRouter
  .get("/", isConnectedMiddleware.execute, descriptionController.findAll)
  .get(
    "/:descriptionId",
    isConnectedMiddleware.execute,
    descriptionController.findOneById
  )
  .post("/", isConnectedMiddleware.execute, descriptionController.create)
  .patch(
    "/:descriptionId",
    isConnectedMiddleware.execute,
    descriptionController.updateOneById
  )
  .delete(
    "/:descriptionId",
    isConnectedMiddleware.execute,
    descriptionController.delete
  );

export default descriptionRouter;
