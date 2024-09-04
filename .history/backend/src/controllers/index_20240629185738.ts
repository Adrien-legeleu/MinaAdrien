import { AuthController } from "./auth.controller";
import { ImageController } from "./images.controller";

const authController = new AuthController();
const imgeController = new ImageController();

export { authController, ImageController };
