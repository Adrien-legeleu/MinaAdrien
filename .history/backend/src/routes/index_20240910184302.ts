import express from "express";
import authRouter from "./auth.route";
import imageRouter from "./image.route";
import letterRouter from "./letter.route";
import descriptionRouter from "./description.router";
import groupRouter from "./group.route";
import themeRouter from "./theme.route";
import subscriptionRouter from "./subscription.route";
import dailyChallengeRouter from "./dailyChallenge.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/image", imageRouter);
appRouter.use("/letter", letterRouter);
appRouter.use("/description", descriptionRouter);
appRouter.use("/group", groupRouter);
appRouter.use("/theme", themeRouter);
appRouter.use("/api", subscriptionRouter);
appRouter.use("/dailyChallenge", dailyChallengeRouter);

export default appRouter;
