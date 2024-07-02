import express from "express";
import {
  isConnectedMiddleware,
  isConnectedMiddlewareGroup,
} from "../middlewares";
import { imageController } from "../controllers";

const imageRouter = express.Router();

imageRouter
  .get(
    "/",
    isConnectedMiddleware.execute,
    isConnectedMiddlewareGroup.execute,
    imageController.findAll
  )
  .get(
    "/:imageId",
    isConnectedMiddleware.execute,
    isConnectedMiddlewareGroup.execute,
    imageController.findById
  )
  .post(
    "/",
    isConnectedMiddleware.execute,
    isConnectedMiddlewareGroup.execute,
    imageController.create
  )
  .get(
    "/",
    isConnectedMiddleware.execute,
    isConnectedMiddlewareGroup.execute,
    imageController.findAll
  )
  .get(
    "/",
    isConnectedMiddleware.execute,
    isConnectedMiddlewareGroup.execute,
    imageController.findAll
  );
