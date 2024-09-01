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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
var model_1 = require("../model");
var utils_1 = require("../utils");
var web_push_1 = __importDefault(require("web-push"));
var ImageController = /** @class */ (function () {
    function ImageController() {
    }
    ImageController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, images, err_1;
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
                        return [4 /*yield*/, model_1.ImageModel.find({ groupId: groupId })];
                    case 1:
                        images = _a.sent();
                        res.status(200).send(images);
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
    ImageController.prototype.findById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var imageId, image, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        imageId = req.params.imageId;
                        return [4 /*yield*/, model_1.ImageModel.findOne({ _id: imageId })];
                    case 1:
                        image = _a.sent();
                        if (!image) {
                            res.status(404).send({
                                error: "image not found : " + imageId,
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(image);
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
    ImageController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId, url, legend, photoDate, isLiked, uploadedImageUrls_1, _i, url_1, urlImage, uploadRes, uploadRes, image, subscriptions, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        _a = req.body, groupId = _a.groupId, url = _a.url, legend = _a.legend, photoDate = _a.photoDate, isLiked = _a.isLiked;
                        if (!groupId || !url) {
                            res.status(404).send({
                                error: "groupdId or url  are not found",
                            });
                            return [2 /*return*/];
                        }
                        uploadedImageUrls_1 = [];
                        if (!Array.isArray(url)) return [3 /*break*/, 5];
                        _i = 0, url_1 = url;
                        _b.label = 1;
                    case 1:
                        if (!(_i < url_1.length)) return [3 /*break*/, 4];
                        urlImage = url_1[_i];
                        return [4 /*yield*/, utils_1.cloudinary.uploader.upload(urlImage, {
                                upload_preset: "lovnia",
                            })];
                    case 2:
                        uploadRes = _b.sent();
                        if (uploadRes) {
                            uploadedImageUrls_1.push(uploadRes.secure_url);
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, utils_1.cloudinary.uploader.upload(url, {
                            upload_preset: "lovnia",
                        })];
                    case 6:
                        uploadRes = _b.sent();
                        if (uploadRes) {
                            uploadedImageUrls_1.push(uploadRes.secure_url);
                        }
                        _b.label = 7;
                    case 7:
                        if (!(uploadedImageUrls_1.length > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, model_1.ImageModel.create({
                                groupId: groupId,
                                url: uploadedImageUrls_1,
                                legend: legend,
                                photoDate: photoDate,
                                isLiked: isLiked,
                            })];
                    case 8:
                        image = _b.sent();
                        console.log(image);
                        return [4 /*yield*/, model_1.SubscriptionModel.find({
                                groupId: { $in: [groupId] }, // Recherche où `groupId` contient l'ID du groupe
                            })];
                    case 9:
                        subscriptions = _b.sent();
                        console.log(subscriptions);
                        // Envoyer des notifications push à chaque abonné trouvé
                        subscriptions.forEach(function (sub) {
                            var pushSubscription = sub.subscription;
                            var payload = JSON.stringify({
                                title: "Nouvelle image ajoutée",
                                body: "Une nouvelle image a été ajoutée dans votre groupe !",
                                image: uploadedImageUrls_1[0], // Optionnel : première image comme illustration
                            });
                            web_push_1.default
                                .sendNotification(pushSubscription, payload)
                                .catch(function (error) {
                                console.error("Erreur lors de l'envoi de la notification", error);
                            });
                        });
                        res.status(200).send(image);
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_3 = _b.sent();
                        console.log(err_3);
                        res.status(err_3 === null || err_3 === void 0 ? void 0 : err_3.message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ImageController.prototype.updateOneById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId, url, legend, photoDate, isLiked, imageId, image, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, groupId = _a.groupId, url = _a.url, legend = _a.legend, photoDate = _a.photoDate, isLiked = _a.isLiked;
                        imageId = req.params.imageId;
                        if (!groupId || !url) {
                            res.status(404).send({
                                error: "groupdId or url are not found",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, model_1.ImageModel.findOneAndUpdate({ groupId: groupId, _id: imageId }, __assign(__assign(__assign(__assign({}, (url ? { url: url } : {})), (legend ? { legend: legend } : {})), (photoDate ? { photoDate: photoDate } : {})), (isLiked ? { isLiked: isLiked } : {})))];
                    case 1:
                        image = _b.sent();
                        if (!image) {
                            res.status(404).send({
                                error: "image not found" + imageId,
                            });
                        }
                        console.log(image);
                        res.status(200).send(image);
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
    ImageController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var imageId, image, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        imageId = req.params.imageId;
                        console.log(imageId);
                        return [4 /*yield*/, model_1.ImageModel.findOneAndDelete({
                                _id: imageId,
                            })];
                    case 1:
                        image = _a.sent();
                        if (!image) {
                            res.status(404).send({
                                error: "product not found :" + imageId,
                            });
                        }
                        console.log(image);
                        res.status(200).send(image);
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
    return ImageController;
}());
exports.ImageController = ImageController;
//# sourceMappingURL=images.controller.js.map