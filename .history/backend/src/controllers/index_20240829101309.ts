import { AuthController } from "./auth.controller";
import { DescriptionController } from "./description.controller";
import { GroupController } from "./group.controller";
import { ImageController } from "./images.controller";
import { LetterController } from "./letter.controller";
import { SubscriptionController } from "./subscription.controller";
import { ThemeController } from "./theme.controller";

const authController = new AuthController();
const imageController = new ImageController();
const letterController = new LetterController();
const descriptionController = new DescriptionController();
const groupController = new GroupController();
const themeController = new ThemeController();
const subscriptionController = new SubscriptionController();

export {
  authController,
  imageController,
  letterController,
  descriptionController,
  groupController,
  themeController,
  subscriptionController,
};
