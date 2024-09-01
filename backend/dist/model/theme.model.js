"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ThemeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
        ref: "groups",
    },
    bio: {
        type: String,
    },
    images: {
        type: [
            {
                groupId: { type: String, required: true, ref: "groups" },
                url: { type: [String], required: true },
                legend: { type: String },
                photoDate: { type: String },
                isLiked: { type: Boolean, required: true, default: false },
            },
        ],
        required: true,
    },
    isLiked: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ThemeModel = mongoose_1.default.model("themes", ThemeSchema);
//# sourceMappingURL=theme.model.js.map