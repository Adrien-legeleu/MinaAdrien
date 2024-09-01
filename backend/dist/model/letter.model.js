"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterModel = exports.LetterSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.LetterSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
        ref: "groups",
    },
    text: {
        type: String,
        required: true,
    },
    url_image: {
        type: String,
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
exports.LetterModel = mongoose_1.default.model("letters", exports.LetterSchema);
//# sourceMappingURL=letter.model.js.map