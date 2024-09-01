"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGroupConnectedMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var IsGroupConnectedMiddleware = /** @class */ (function () {
    function IsGroupConnectedMiddleware() {
    }
    IsGroupConnectedMiddleware.prototype.execute = function (req, res, next) {
        var _a;
        try {
            var groupTokenHeader = req.headers["group-authorization"];
            if (!groupTokenHeader) {
                res.status(401).send({
                    error: "No group token",
                });
                return;
            }
            var groupToken = groupTokenHeader;
            var token = groupToken.split(" ")[1];
            if (!token) {
                res.status(401).send({
                    error: "Invalid group token format",
                });
                return;
            }
            var jwtSecret = (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : "";
            if (!jwtSecret) {
                res.status(500).send({
                    error: "JWT secret is not defined",
                });
                return;
            }
            // TypeScript should recognize req.group here
            req.group = jsonwebtoken_1.default.verify(token, jwtSecret);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).send({
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    };
    return IsGroupConnectedMiddleware;
}());
exports.IsGroupConnectedMiddleware = IsGroupConnectedMiddleware;
//# sourceMappingURL=isConnectedGroup.middleware.js.map