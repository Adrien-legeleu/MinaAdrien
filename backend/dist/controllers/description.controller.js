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
exports.DescriptionController = void 0;
var model_1 = require("../model");
var DescriptionController = /** @class */ (function () {
    function DescriptionController() {
    }
    DescriptionController.prototype.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, description, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        groupId = req.params.groupId;
                        console.log(groupId);
                        return [4 /*yield*/, model_1.DescriptionModel.find({ groupId: groupId })];
                    case 1:
                        description = _a.sent();
                        console.log(description);
                        res.status(200).send(description);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(500).send({
                            error: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DescriptionController.prototype.findOneById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, descriptionId, description, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        groupId = req.body.groupId;
                        descriptionId = req.params.descriptionId;
                        return [4 /*yield*/, model_1.DescriptionModel.findOne({
                                groupId: groupId,
                                _id: descriptionId,
                            })];
                    case 1:
                        description = _a.sent();
                        if (!description) {
                            res.status(404).send({
                                error: "description not found" + descriptionId,
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(description);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send({
                            error: error_2 === null || error_2 === void 0 ? void 0 : error_2.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DescriptionController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId, description, images, newDescription, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, groupId = _a.groupId, description = _a.description, images = _a.images;
                        if (!groupId || !description) {
                            res.status(404).send({
                                error: "properties not found (groupdId or description or images )",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, model_1.DescriptionModel.create({
                                groupId: groupId,
                                images: images,
                                description: description,
                            })];
                    case 1:
                        newDescription = _b.sent();
                        console.log(newDescription);
                        res.status(200).send(newDescription);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.log(error_3);
                        res.status(500).send({
                            error: error_3 === null || error_3 === void 0 ? void 0 : error_3.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DescriptionController.prototype.updateOneById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId, images, description, descriptionId, newDescription, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, groupId = _a.groupId, images = _a.images, description = _a.description;
                        descriptionId = req.params.descriptionId;
                        if (!descriptionId) {
                            res.status(404).send({
                                error: "description  not found" + descriptionId,
                            });
                            return [2 /*return*/];
                        }
                        if (!groupId || !description) {
                            res.status(404).send({
                                error: "properties not found (groupdId or title or text or url_images or isLiked)",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, model_1.DescriptionModel.findOneAndUpdate({
                                groupId: groupId,
                                _id: descriptionId,
                            }, __assign(__assign({}, (description ? { description: description } : {})), (images ? { images: images } : {})))];
                    case 1:
                        newDescription = _b.sent();
                        if (!newDescription) {
                            res.status(404).send({
                                error: "description not found" + descriptionId,
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(newDescription);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        res.status(500).send({
                            error: error_4 === null || error_4 === void 0 ? void 0 : error_4.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DescriptionController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var descriptionId, description, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        descriptionId = req.params.descriptionId;
                        return [4 /*yield*/, model_1.DescriptionModel.findOneAndDelete({
                                _id: descriptionId,
                            })];
                    case 1:
                        description = _a.sent();
                        if (!description) {
                            res.status(404).send({
                                error: "description not found" + descriptionId,
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(description);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(500).send({
                            error: error_5 === null || error_5 === void 0 ? void 0 : error_5.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DescriptionController;
}());
exports.DescriptionController = DescriptionController;
//# sourceMappingURL=description.controller.js.map