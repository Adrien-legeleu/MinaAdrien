import { IsConnectedMiddleware } from "./isConnected.middleware";
import { IsGroupConnectedMiddlewareGroup } from "./isConnected.middlewareGroup";

const isConnectedMiddleware = new IsConnectedMiddleware();
const isConnectedMiddlewareGroup = new IsGroupConnectedMiddlewareGroup();

export { isConnectedMiddleware, isConnectedMiddlewareGroup };
