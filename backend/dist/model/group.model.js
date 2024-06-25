"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GroupSchema = new mongoose_1.default.Schema({
    groupname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilPhoto: {
        type: String,
    },
    members: {
        type: [
            {
                pseudoUser: {
                    type: String,
                },
                userId: {
                    type: String,
                    ref: "users",
                },
            },
        ],
        required: true,
    },
});
exports.GroupModel = mongoose_1.default.model("groups", GroupSchema);
