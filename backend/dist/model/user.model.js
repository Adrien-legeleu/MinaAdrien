"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilPhoto: {
        type: String,
    },
    groups: [
        {
            groupId: {
                type: String,
                required: true,
                ref: "groups",
            },
        },
    ],
});
exports.UserModel = mongoose_1.default.model("users", UserSchema);
//# sourceMappingURL=user.model.js.map