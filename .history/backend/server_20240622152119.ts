import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "./src/routes";

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

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Corrected URL with colon
  })
);

// Ensure CORS middleware is placed before your routes
app.use("", appRouter);

app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url: http://localhost:${PORT}`
  );
});
