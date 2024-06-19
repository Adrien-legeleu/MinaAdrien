import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 6000;
if (uri) {
  mongoose.connect(uri).then(() => {
    console.log("mongoDb connected");
  });
}
