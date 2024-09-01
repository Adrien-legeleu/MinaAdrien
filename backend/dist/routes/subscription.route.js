"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var subscriptionRouter = express_1.default.Router();
subscriptionRouter
    .post("/save-subscription", controllers_1.subscriptionController.createSubscription)
    .patch("/update-subscription/:userId", controllers_1.subscriptionController.updateSubscription);
exports.default = subscriptionRouter;
//# sourceMappingURL=subscription.route.js.map