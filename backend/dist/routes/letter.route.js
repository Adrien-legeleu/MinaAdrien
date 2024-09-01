"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var letterRouter = express_1.default.Router();
letterRouter
    .get("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.letterController.findAll)
    .get("/:letterId", middlewares_1.isConnectedMiddleware.execute, controllers_1.letterController.findOneById)
    .post("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.letterController.create)
    .patch("/:letterId", middlewares_1.isConnectedMiddleware.execute, controllers_1.letterController.updateOneById)
    .delete(":letterId/", middlewares_1.isConnectedMiddleware.execute, controllers_1.letterController.delete);
exports.default = letterRouter;
//# sourceMappingURL=letter.route.js.map