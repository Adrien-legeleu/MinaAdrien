"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeController = void 0;
var utils_1 = require("../utils");
var model_1 = require("../model");
var ThemeController = /** @class */ (function () {
    function ThemeController() {
    }
    ThemeController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, themes, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        groupId = req.params.groupId;
                        if (!groupId) {
                            res.status(404).send({
                                error: "groupId not found",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, model_1.ThemeModel.find({ groupId: groupId })];
                    case 1:
                        themes = _a.sent();
                        res.status(200).send(themes);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.status(500).send({
                            error: err_1 === null || err_1 === void 0 ? void 0 : err_1.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ThemeController.prototype.findById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, themeId, theme, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        groupId = req.body.groupId;
                        themeId = req.params.themeId;
                        console.log(groupId, themeId);
                        return [4 /*yield*/, model_1.ThemeModel.findOne({
                                _id: themeId,
                                groupId: groupId,
                            })];
                    case 1:
                        theme = _a.sent();
                        if (!theme) {
                            res.status(404).send({
                                error: "product not found :" + themeId,
                            });
                        }
                        res.status(200).send(theme);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        res.status(err_2 === null || err_2 === void 0 ? void 0 : err_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ThemeController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId, images, title, bio, isLiked, uploadedImages, _i, images_1, image, uploadRes, theme, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, groupId = _a.groupId, images = _a.images, title = _a.title, bio = _a.bio, isLiked = _a.isLiked;
                        if (!groupId || !images || !title) {
                            res.status(404).send({
                                error: "groupdId or images or title are not found",
                            });
                            return [2 /*return*/];
                        }
                        uploadedImages = [];
                        _i = 0, images_1 = images;
                        _b.label = 1;
                    case 1:
                        if (!(_i < images_1.length)) return [3 /*break*/, 4];
                        image = images_1[_i];
                        return [4 /*yield*/, utils_1.cloudinary.uploader.upload(image.url, {
                                upload_preset: "lovnia",
                            })];
                    case 2:
                        uploadRes = _b.sent();
                        if (uploadRes) {
                            uploadedImages.push({
                                groupId: groupId,
                                url: [uploadRes.secure_url],
                                legend: image.legend,
                                photoDate: image.datePhoto,
                                isLiked: image.isLiked,
                            });
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!(uploadedImages.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, model_1.ThemeModel.create({
                                groupId: groupId,
                                images: uploadedImages,
                                title: title,
                                bio: bio,
                                isLiked: isLiked,
                            })];
                    case 5:
                        theme = _b.sent();
                        res.status(200).send(theme);
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(400).send({
                            error: "No images were uploaded successfully",
                        });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_3 = _b.sent();
                        console.log(err_3);
                        res.status(500).send({
                            error: err_3 === null || err_3 === void 0 ? void 0 : err_3.message,
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ThemeController.prototype.updateOneById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var themeId, _a, groupId, images, title, bio, isLiked, theme, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        themeId = req.params.themeId;
                        _a = req.body, groupId = _a.groupId, images = _a.images, title = _a.title, bio = _a.bio, isLiked = _a.isLiked;
                        console.log(images);
                        if (!groupId || !images || !themeId) {
                            res.status(400).send({
                                error: "Missing required fields: groupId, images, title, or themeId",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, model_1.ThemeModel.findOneAndUpdate({ groupId: groupId, _id: themeId }, __assign(__assign(__assign(__assign({}, (images ? { images: images } : {})), (title ? { title: title } : {})), (bio ? { bio: bio } : {})), (isLiked ? { isLiked: isLiked } : {})))];
                    case 1:
                        theme = _b.sent();
                        if (!theme) {
                            res.status(404).send({
                                error: "image not found" + themeId,
                            });
                        }
                        console.log(theme);
                        res.status(200).send(theme);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        console.log(err_4);
                        res.status(err_4 === null || err_4 === void 0 ? void 0 : err_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ThemeController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, themeId, theme, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        groupId = req.body.groupId;
                        themeId = req.params.themeId;
                        return [4 /*yield*/, model_1.ThemeModel.findOneAndDelete({
                                _id: themeId,
                                groupId: groupId,
                            })];
                    case 1:
                        theme = _a.sent();
                        if (!theme) {
                            res.status(404).send({
                                error: "product not found :" + themeId,
                            });
                        }
                        res.status(200).send(theme);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5);
                        res.status(err_5 === null || err_5 === void 0 ? void 0 : err_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ThemeController;
}());
exports.ThemeController = ThemeController;
//# sourceMappingURL=theme.controller.js.map