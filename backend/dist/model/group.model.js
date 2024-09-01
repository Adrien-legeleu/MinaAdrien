"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var GroupSchema = new mongoose_1.default.Schema({
    groupName: {
        type: String,
        required: true,
    },
    groupCode: {
        type: String,
        required: true,
    },
    urlProfil: {
        type: String,
    },
    members: {
        type: [
            {
                pseudo: {
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
//# sourceMappingURL=group.model.js.map