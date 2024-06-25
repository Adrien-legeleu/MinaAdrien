import { IsGroupConnectedMiddleware } from "./isConnectedGroup.middleware";

const isConnectedMiddleware = new IsConnectedMiddleware();
const isConnectedMiddlewareGroup = new IsGroupConnectedMiddleware();

export { isConnectedMiddleware, isConnectedMiddlewareGroup };
