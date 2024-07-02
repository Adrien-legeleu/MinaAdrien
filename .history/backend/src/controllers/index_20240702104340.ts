import { AuthController } from "./auth.controller";
import { ImageController } from "./images.controller";
import { LetterController } from "./letter.controller";

const authController = new AuthController();
const imageController = new ImageController();
const letterController = new LetterController();

export { authController, imageController };
