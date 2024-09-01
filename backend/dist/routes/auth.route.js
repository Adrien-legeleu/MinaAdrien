"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var authRouter = express_1.default.Router();
authRouter
    .post("/login", controllers_1.authController.login)
    .post("/register", controllers_1.authController.register)
    .post("/login-user", controllers_1.authController.loginUser)
    .post("/register-user", controllers_1.authController.registerUser)
    .post("/choose-pseudo", controllers_1.authController.choosePseudo)
    .patch("/:userId/:groupId", controllers_1.authController.deleteGroup)
    .get("/check-token-user", middlewares_1.isConnectedMiddleware.execute, controllers_1.authController.checkToken)
    .get("/user/:userId", middlewares_1.isConnectedMiddleware.execute, controllers_1.authController.findUserById);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map