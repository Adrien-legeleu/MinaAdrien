import { AuthController } from "./auth.controller";
import { DescriptionController } from "./description.controller";
import { GroupController } from "./group.controller";
import { ImageController } from "./images.controller";
import { LetterController } from "./letter.controller";

const authController = new AuthController();
const imageController = new ImageController();
const letterController = new LetterController();
const descriptionController = new DescriptionController();
const groupController = new GroupController();

export {
  authController,
  imageController,
  letterController,
  descriptionController,
  groupController,
};
