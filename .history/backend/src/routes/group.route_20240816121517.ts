import express from "express";
import { isConnectedMiddleware } from "../middlewares";
import { groupController } from "../controllers";
const groupRouter = express.Router();

groupRouter
  .get("/:groupId", isConnectedMiddleware.execute, groupController.findOneById)
  .patch(
    "/:groupId",
    isConnectedMiddleware.execute,
    groupController.updateOneById
  )
  .get("/", isConnectedMiddleware.execute, groupController.findOneById);

export default groupRouter;
