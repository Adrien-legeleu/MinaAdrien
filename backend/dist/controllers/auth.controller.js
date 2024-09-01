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
exports.AuthController = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var group_model_1 = require("../model/group.model");
var user_model_1 = require("../model/user.model");
var crypto_1 = __importDefault(require("crypto"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.getTokenUser = function (user) {
        var _a;
        var jwtSecret = (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "";
        if (!jwtSecret) {
            throw new Error("jwt secret is not defined");
        }
        return jsonwebtoken_1.default.sign({
            userId: user._id,
        }, jwtSecret, {
            expiresIn: "2d",
        });
    };
    AuthController.prototype.checkToken = function (req, res) {
        res.status(200).json({
            message: "Token is valid",
            user: req.user ? __assign({}, req.user) : null,
        });
    };
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupCode, userId_1, group_1, user, isGroupsUser, isMember, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, groupCode = _a.groupCode, userId_1 = _a.userId;
                        if (!groupCode || !userId_1) {
                            res.status(401).send({
                                error: "Groupname, groupCode are incorrect",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, group_model_1.GroupModel.findOne({ groupCode: groupCode })];
                    case 1:
                        group_1 = _b.sent();
                        if (!group_1) {
                            res.status(401).send({
                                error: "groupCode are incorrect",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ _id: userId_1 })];
                    case 2:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 4];
                        isGroupsUser = user.groups.some(function (groupUser) { return groupUser.groupId === group_1._id; });
                        if (!!isGroupsUser) return [3 /*break*/, 4];
                        user.groups.push({
                            groupId: group_1._id,
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        console.log(user);
                        isMember = group_1.members.some(function (member) { return member.userId.toString() === userId_1; });
                        if (isMember) {
                            res.status(200).send({ group: group_1, redirect: "HomePage", user: user });
                        }
                        else {
                            res.status(200).send({ group: group_1, redirect: "choosePseudoPage", user: user });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        console.log(err_1);
                        res.status(500).send({
                            error: err_1 === null || err_1 === void 0 ? void 0 : err_1.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupname, userId, pseudo, groupName, group, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, groupname = _a.groupname, userId = _a.userId, pseudo = _a.pseudo;
                        if (!groupname || !userId) {
                            res.status(404).send({
                                error: "Missing properties",
                            });
                            return [2 /*return*/];
                        }
                        groupName = groupname;
                        return [4 /*yield*/, group_model_1.GroupModel.create({
                                groupName: groupName,
                                urlProfil: "",
                                groupCode: crypto_1.default.randomBytes(5).toString("hex"),
                                members: [
                                    {
                                        pseudo: pseudo,
                                        userId: userId,
                                    },
                                ],
                            })];
                    case 1:
                        group = _b.sent();
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ _id: userId })];
                    case 2:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 4];
                        user.groups.push({
                            groupId: group._id,
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        res.status(200).send({ group: group, user: user });
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        console.log(err_2);
                        res.status(500).send({
                            error: err_2 === null || err_2 === void 0 ? void 0 : err_2.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.deleteGroup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, groupId_1, userId, user, group, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.params, groupId_1 = _a.groupId, userId = _a.userId;
                        console.log(groupId_1, userId);
                        if (!groupId_1 || !userId) {
                            res.status(404).send({
                                error: "Missing properties",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ _id: userId })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 3];
                        user.groups = user.groups.filter(function (group) { return group.groupId !== groupId_1; });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, group_model_1.GroupModel.findOneAndDelete({ _id: groupId_1 })];
                    case 4:
                        group = _b.sent();
                        if (!group) {
                            res.status(404).send({
                                error: "group not found " + groupId_1,
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(group);
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        console.log(err_3);
                        res.status(500).send({
                            error: err_3 === null || err_3 === void 0 ? void 0 : err_3.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, user, isCorrectedPassword, authToken, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password;
                        if (!username || !password) {
                            res.status(401).send({
                                error: "Password or username are incorrects",
                            });
                            return [2 /*return*/];
                        }
                        console.log(username, password);
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ username: username })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(401).send({
                                error: "Username or password are incorrect",
                            });
                            return [2 /*return*/];
                        }
                        console.log(user);
                        isCorrectedPassword = bcrypt_1.default.compareSync(password, user.password);
                        if (!isCorrectedPassword) {
                            res.status(401).send({
                                error: "Username or password are incorrect",
                            });
                            return [2 /*return*/];
                        }
                        user.password = "";
                        authToken = AuthController.getTokenUser(user);
                        res.status(200).send({ user: user, authToken: authToken });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        console.log(err_4);
                        res.status(500).send({
                            error: err_4 === null || err_4 === void 0 ? void 0 : err_4.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, salt, hashedPassword, user, authToken, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                        if (!username || !password || !email) {
                            res.status(404).send({
                                error: "Properties not found",
                            });
                            return [2 /*return*/];
                        }
                        salt = bcrypt_1.default.genSaltSync(10);
                        hashedPassword = bcrypt_1.default.hashSync(password, salt);
                        return [4 /*yield*/, user_model_1.UserModel.create({
                                email: email,
                                username: username,
                                password: hashedPassword,
                            })];
                    case 1:
                        user = _b.sent();
                        user.password = "";
                        authToken = AuthController.getTokenUser(user);
                        res.status(200).send({ user: user, authToken: authToken });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _b.sent();
                        console.log(err_5);
                        res.status(500).send({
                            error: err_5 === null || err_5 === void 0 ? void 0 : err_5.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.findUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        if (!userId) {
                            res.status(404).send({
                                error: "UserId not found",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ _id: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).send({
                                error: "User not found",
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).send(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log(err_6);
                        res.status(500).send({
                            error: err_6 === null || err_6 === void 0 ? void 0 : err_6.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.choosePseudo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pseudoUser, userId_2, groupId, group, memberExists, pseudo, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, pseudoUser = _a.pseudoUser, userId_2 = _a.userId, groupId = _a.groupId;
                        console.log(pseudoUser, groupId, userId_2);
                        if (!userId_2 || !groupId || !pseudoUser) {
                            res.status(404).send({
                                error: "Properties not found",
                            });
                            return [2 /*return*/]; // Arrêter l'exécution de la fonction
                        }
                        return [4 /*yield*/, group_model_1.GroupModel.findById(groupId)];
                    case 1:
                        group = _b.sent();
                        if (!group) {
                            res.status(404).send({
                                error: "Group not found",
                            });
                            return [2 /*return*/]; // Arrêter l'exécution de la fonction
                        }
                        memberExists = group.members.some(function (member) { return member.userId === userId_2; });
                        console.log(group);
                        console.log(memberExists);
                        if (memberExists) {
                            res.status(409).send({
                                error: "userId already exists",
                            });
                            console.log("oieozieozieoi");
                            return [2 /*return*/]; // Arrêter l'exécution de la fonction
                        }
                        pseudo = pseudoUser;
                        group.members.push({
                            pseudo: pseudo,
                            userId: userId_2,
                        });
                        return [4 /*yield*/, group.save()];
                    case 2:
                        _b.sent();
                        res.status(200).send(group);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).send({
                            error: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map