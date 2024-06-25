"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUserConnectedMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IsUserConnectedMiddleware {
    execute(req, res, next) {
        var _a;
        try {
            const userTokenHeader = req.headers["user-authorization"];
            if (!userTokenHeader) {
                res.status(401).send({
                    error: "No user token",
                });
                return;
            }
            const userToken = userTokenHeader;
            const token = userToken.split(" ")[1];
            if (!token) {
                res.status(401).send({
                    error: "Invalid user token format",
                });
                return;
            }
            const jwtSecret = (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "";
            if (!jwtSecret) {
                res.status(500).send({
                    error: "JWT secret is not defined",
                });
                return;
            }
            req.user = jsonwebtoken_1.default.verify(token, jwtSecret);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).send({
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    }
}
exports.IsUserConnectedMiddleware = IsUserConnectedMiddleware;
