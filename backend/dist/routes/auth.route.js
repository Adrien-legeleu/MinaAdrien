"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const authRouter = express_1.default.Router();
authRouter
    .post("/login", controllers_1.authController.login)
    .post("/register", controllers_1.authController.register)
    .post("/login-user", controllers_1.authController.loginUser)
    .post("/register-user", controllers_1.authController.registerUser)
    .post("/choose-pseudo", controllers_1.authController.choosePseudo)
    .get("check-token-user", middlewares_1.isConnectedMiddleware.execute, controllers_1.authController.checkToken)
    .get("check-token-group", middlewares_1.isConnectedMiddlewareGroup.execute, controllers_1.authController.checkToken);
exports.default = authRouter;
