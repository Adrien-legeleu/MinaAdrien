import { AuthController } from "./auth.controller";
import { ImageController } from "./images.controller";

const authController = new AuthController();
const imageController = new ImageController();

export { authController, imageController };
