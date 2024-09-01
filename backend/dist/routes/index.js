"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth.route"));
var image_route_1 = __importDefault(require("./image.route"));
var letter_route_1 = __importDefault(require("./letter.route"));
var description_router_1 = __importDefault(require("./description.router"));
var group_route_1 = __importDefault(require("./group.route"));
var theme_route_1 = __importDefault(require("./theme.route"));
var subscription_route_1 = __importDefault(require("./subscription.route"));
var appRouter = express_1.default.Router();
appRouter.use("/auth", auth_route_1.default);
appRouter.use("/image", image_route_1.default);
appRouter.use("/letter", letter_route_1.default);
appRouter.use("/description", description_router_1.default);
appRouter.use("/group", group_route_1.default);
appRouter.use("/theme", theme_route_1.default);
appRouter.use("/api", subscription_route_1.default);
exports.default = appRouter;
//# sourceMappingURL=index.js.map