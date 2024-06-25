"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConnectedMiddlewareGroup = exports.isConnectedMiddleware = void 0;
const isConnectedGroup_middleware_1 = require("./isConnectedGroup.middleware");
const isConnected_middleware_1 = require("./isConnected.middleware");
const isConnectedMiddleware = new isConnected_middleware_1.IsUserConnectedMiddleware();
exports.isConnectedMiddleware = isConnectedMiddleware;
const isConnectedMiddlewareGroup = new isConnectedGroup_middleware_1.IsGroupConnectedMiddleware();
exports.isConnectedMiddlewareGroup = isConnectedMiddlewareGroup;
