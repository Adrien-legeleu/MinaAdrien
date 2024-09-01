"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionModel = exports.DescriptionSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.DescriptionSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
        ref: "groups",
    },
    images: {
        type: [String],
    },
}, {
    timestamps: true,
});
exports.DescriptionModel = mongoose_1.default.model("descriptions", exports.DescriptionSchema);
//# sourceMappingURL=description.model.js.map