import { IsGroupConnectedMiddleware } from "./isConnectedGroup.middleware";
import { IsUserConnectedMiddleware } from "./isConnected.middleware";

const isConnectedMiddleware = new IsUserConnectedMiddleware();
const isConnectedMiddlewareGroup = new IsGroupConnectedMiddleware();

export { isConnectedMiddleware, isConnectedMiddlewareGroup };
