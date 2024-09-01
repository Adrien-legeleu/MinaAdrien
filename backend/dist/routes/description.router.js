"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var descriptionRouter = express_1.default.Router();
descriptionRouter
    .get("/all/:groupId", middlewares_1.isConnectedMiddleware.execute, controllers_1.descriptionController.findAll)
    .get("/:descriptionId", middlewares_1.isConnectedMiddleware.execute, controllers_1.descriptionController.findOneById)
    .post("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.descriptionController.create)
    .patch("/:descriptionId", middlewares_1.isConnectedMiddleware.execute, controllers_1.descriptionController.updateOneById)
    .delete("/:descriptionId", middlewares_1.isConnectedMiddleware.execute, controllers_1.descriptionController.delete);
exports.default = descriptionRouter;
//# sourceMappingURL=description.router.js.map