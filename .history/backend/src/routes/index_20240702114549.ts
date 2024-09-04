import express from "express";
import authRouter from "./auth.route";
import imageRouter from "./image.route";
import letterRouter from "./letter.route";
import descriptionRouter from "./description.router";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/image", imageRouter);
appRouter.use("/letter", letterRouter);
appRouter.use("/description", descriptionRouter);

export default appRouter;
