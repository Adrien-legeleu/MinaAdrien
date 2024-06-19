import express from "express";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_KEY || "";
const PORT = 6000;
