import express from "express";
import authRouter from "./auth.route";
import imageRouter from "./image.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/image", imageRouter);

export default appRouter;
