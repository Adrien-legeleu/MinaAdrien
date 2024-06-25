import express from "express";
import { authController } from "../controllers";
import { isConnectedMiddleware, isConnectedMiddlewareGroup } from "../middlewares";

const authRouter = express.Router();

authRouter
  .post("/login", authController.login)
  .post("/register", authController.register)
  .post("/login-user", authController.loginUser)
  .post("/register-user", authController.registerUser)
  .post("/choose-pseudo", authController.choosePseudo)
  .get(
    "check-token-user",
    isConnectedMiddleware.execute,
    authController.checkTokenGroup
  );
  .get(
    "check-token-group",
    isConnectedMiddlewareGroup.execute,
    authController.checkTokenGroup
  );

export default authRouter;
