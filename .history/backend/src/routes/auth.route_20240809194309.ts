import express from "express";
import { authController } from "../controllers";
import { isConnectedMiddleware } from "../middlewares";

const authRouter = express.Router();

authRouter
  .post("/login", authController.login)
  .post("/register", authController.register)
  .post("/login-user", authController.loginUser)
  .post("/register-user", authController.registerUser)
  .post("/choose-pseudo", authController.choosePseudo)
  .patch("/:userId/:groupId", authController.deleteGroup)
  .patch("/update/:userId/:groupId", authController.updateGroupOneById)
  .get(
    "/check-token-user",
    isConnectedMiddleware.execute,
    authController.checkToken
  )

  .get(
    "/user/:userId",
    isConnectedMiddleware.execute,
    authController.findUserById
  );

export default authRouter;
