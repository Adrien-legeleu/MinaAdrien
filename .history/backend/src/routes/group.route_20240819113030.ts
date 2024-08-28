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
  .patch("/update/:groupId", authController.updateGroupOneById)
  .get("/", isConnectedMiddleware.execute, groupController.findAll);

export default groupRouter;
