import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 6000;
if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("mongoDb connected");
    })
    .catch((err: any) => {
      console.log(err);
    });
} else {
  console.log("no URI to DB");
}

const app = express();

app.use();
