"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const group_model_1 = require("../model/group.model");
const user_model_1 = require("../model/user.model");
class AuthController {
    static getTokenGroup(group) {
        var _a;
        const jwtSecret = (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "";
        if (!jwtSecret) {
            throw new Error("jwt secret is not defined");
        }
        return jsonwebtoken_1.default.sign({
            groupId: group._id,
        }, jwtSecret, {
            expiresIn: "2d",
        });
    }
    static getTokenUser(user) {
        var _a;
        const jwtSecret = (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "";
        if (!jwtSecret) {
            throw new Error("jwt secret is not defined");
        }
        return jsonwebtoken_1.default.sign({
            userId: user._id,
        }, jwtSecret, {
            expiresIn: "2d",
        });
    }
    checkToken(req, res) {
        res.status(200).send(req);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupname, password, userId } = req.body;
                if (!groupname || !password || !userId) {
                    res.status(401).send({
                        error: "Groupname, password are incorrect",
                    });
                    return;
                }
                const group = yield group_model_1.GroupModel.findOne({ groupname });
                if (!group) {
                    res.status(401).send({
                        error: "Groupname or password are incorrect",
                    });
                    return;
                }
                const isCorrectedPassword = bcrypt_1.default.compareSync(password, group.password);
                if (!isCorrectedPassword) {
                    res.status(401).send({
                        error: "Groupname or password are incorrect",
                    });
                    return;
                }
                const isMember = group.members.some((member) => member.userId.toString() === userId);
                if (isMember) {
                    const authToken = AuthController.getTokenGroup(group);
                    res.status(200).send({ group, authToken, redirect: "groupPage" });
                }
                else {
                    res.status(200).send({ redirect: "choosePseudoPage" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    error: err === null || err === void 0 ? void 0 : err.message,
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupname, password, userId } = req.body;
                if (!groupname || !password || !userId) {
                    res.status(404).send({
                        error: "Missing properties",
                    });
                    return;
                }
                const salt = bcrypt_1.default.genSaltSync(10);
                const hashPassword = bcrypt_1.default.hashSync(password, salt);
                const group = yield group_model_1.GroupModel.create({
                    groupname,
                    password: hashPassword,
                });
                group.password = "";
                const authToken = AuthController.getTokenGroup(group);
                res.status(200).send({ group, authToken });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    error: err === null || err === void 0 ? void 0 : err.message,
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    res.status(401).send({
                        error: "Password or username are incorrects",
                    });
                    return;
                }
                console.log(username, password);
                const user = yield user_model_1.UserModel.findOne({ username });
                if (!user) {
                    res.status(401).send({
                        error: "Username or password are incorrect",
                    });
                    return;
                }
                console.log(user);
                const isCorrectedPassword = bcrypt_1.default.compareSync(password, user.password);
                if (!isCorrectedPassword) {
                    res.status(401).send({
                        error: "Username or password are incorrect",
                    });
                    return;
                }
                user.password = "";
                const authToken = AuthController.getTokenUser(user);
                res.status(200).send({ user, authToken });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    error: err === null || err === void 0 ? void 0 : err.message,
                });
            }
        });
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                if (!username || !password || !email) {
                    res.status(404).send({
                        error: "Properties not found",
                    });
                    return;
                }
                const salt = bcrypt_1.default.genSaltSync(10);
                const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                const user = yield user_model_1.UserModel.create({
                    email,
                    username,
                    password: hashedPassword,
                });
                user.password = "";
                const authToken = AuthController.getTokenUser(user);
                res.status(200).send({ user, authToken });
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    error: err === null || err === void 0 ? void 0 : err.message,
                });
            }
        });
    }
    choosePseudo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pseudoUser, userId, groupId } = req.body;
                console.log(pseudoUser, groupId, userId);
                if (!userId || !groupId || !pseudoUser) {
                    res.status(404).send({
                        error: "Properties not found",
                    });
                    return;
                }
                const group = yield group_model_1.GroupModel.findById(groupId);
                if (!group) {
                    res.status(404).send({
                        error: "Group not found",
                    });
                    return;
                }
                group.members.map((member) => {
                    if (member.userId === userId) {
                        res.status(409).send({
                            error: "userId even existed",
                        });
                    }
                    return;
                });
                group.members.push({
                    pseudoUser,
                    userId,
                });
                yield group.save();
                res.status(200).send(group);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({
                    error: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
