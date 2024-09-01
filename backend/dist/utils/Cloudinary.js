"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var cloudinary_1 = __importDefault(require("cloudinary"));
dotenv_1.default.config();
var cloudinary = cloudinary_1.default.v2;
exports.cloudinary = cloudinary;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//# sourceMappingURL=Cloudinary.js.map