"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var subscriptionSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    groupId: {
        type: [String],
    },
    subscription: {
        type: Object,
        required: true,
    },
});
exports.SubscriptionModel = mongoose_1.default.model("subscription", subscriptionSchema);
//# sourceMappingURL=notificationsMemberships.model.js.map