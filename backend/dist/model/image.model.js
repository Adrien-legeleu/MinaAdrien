"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = exports.ImageSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.ImageSchema = new mongoose_1.default.Schema({
    url: {
        type: [String],
        required: true,
    },
    groupId: {
        type: String,
        required: true,
        ref: "groups",
    },
    legend: {
        type: String,
    },
    photoDate: {
        type: String,
    },
    isLiked: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ImageModel = mongoose_1.default.model("images", exports.ImageSchema);
//# sourceMappingURL=image.model.js.map