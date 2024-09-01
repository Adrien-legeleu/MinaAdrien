"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var groupRouter = express_1.default.Router();
groupRouter
    .get("/:groupId", middlewares_1.isConnectedMiddleware.execute, controllers_1.groupController.findOneById)
    .patch("/:groupId", controllers_1.groupController.updateGroupOneById)
    .get("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.groupController.findAll);
exports.default = groupRouter;
//# sourceMappingURL=group.route.js.map