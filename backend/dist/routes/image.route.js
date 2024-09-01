"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var imageRouter = express_1.default.Router();
imageRouter
    .get("/all/:groupId", middlewares_1.isConnectedMiddleware.execute, controllers_1.imageController.findAll)
    .get("/:imageId", middlewares_1.isConnectedMiddleware.execute, controllers_1.imageController.findById)
    .post("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.imageController.create)
    .patch("/:imageId", middlewares_1.isConnectedMiddleware.execute, controllers_1.imageController.updateOneById)
    .delete("/:imageId", middlewares_1.isConnectedMiddleware.execute, controllers_1.imageController.delete);
exports.default = imageRouter;
//# sourceMappingURL=image.route.js.map