import { AuthController } from "./auth.controller";
import { DescriptionController } from "./description.controller";
import { ImageController } from "./images.controller";
import { LetterController } from "./letter.controller";

const authController = new AuthController();
const imageController = new ImageController();
const letterController = new LetterController();
const descriptionController = new DescriptionController();

export { authController, imageController, letterController };
