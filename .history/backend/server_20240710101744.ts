import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "./src/routes";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 5000;

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

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "group-authorization"], // Ajout de "group-authorization"
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);

// Middleware pour gérer les requêtes pré-vol
app.options("*", cors()); // Répondre aux requêtes OPTIONS pour toutes les routes

app.use("", appRouter);

app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url: http://localhost:${PORT}`
  );
});
