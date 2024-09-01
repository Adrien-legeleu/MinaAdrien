"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var themeRouter = express_1.default.Router();
themeRouter
    .get("/all/:groupId", middlewares_1.isConnectedMiddleware.execute, controllers_1.themeController.findAll)
    .get("/:themeId", middlewares_1.isConnectedMiddleware.execute, controllers_1.themeController.findById)
    .post("/", middlewares_1.isConnectedMiddleware.execute, controllers_1.themeController.create)
    .patch("/:themeId", middlewares_1.isConnectedMiddleware.execute, controllers_1.themeController.updateOneById)
    .delete("/:themeId", middlewares_1.isConnectedMiddleware.execute, controllers_1.themeController.delete);
exports.default = themeRouter;
//# sourceMappingURL=theme.route.js.map