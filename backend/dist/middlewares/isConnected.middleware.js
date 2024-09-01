"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUserConnectedMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var IsUserConnectedMiddleware = /** @class */ (function () {
    function IsUserConnectedMiddleware() {
    }
    IsUserConnectedMiddleware.prototype.execute = function (req, res, next) {
        var _a, _b, _c;
        try {
            var authToken = ((_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1]) || "";
            if (!authToken) {
                res.status(401).send({
                    error: "No token",
                });
                return;
            }
            var jwtSecret = (_c = process.env.JWT_KEY) !== null && _c !== void 0 ? _c : "";
            if (!jwtSecret) {
                res.status(500).send({
                    error: "jwt secret is not defined",
                });
                return;
            }
            req.user = jsonwebtoken_1.default.verify(authToken, jwtSecret);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).send({
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    };
    return IsUserConnectedMiddleware;
}());
exports.IsUserConnectedMiddleware = IsUserConnectedMiddleware;
//# sourceMappingURL=isConnected.middleware.js.map