import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import webpush from "web-push";
import appRouter from "./routes";
import { DailyChallengeController } from "./controllers/dailyChallenge.controller";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 5050;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err: any) => {
      console.log(err);
    });
} else {
  console.log("No URI to DB");
}

webpush.setVapidDetails(
  "mailto:adrienlegeleu@gmail.com",
  process.env.PUBLIC_VAPID_KEY as string,
  process.env.PRIVATE_VAPID_KEY as string
);

const app = express();

const corsOptions = {
  origin: "https://lovna.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("", appRouter);
DailyChallengeController.scheduleDailyChallenge();

app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url: http://localhost:${PORT}`
  );
});
