import express from "express";
import mongoose from "mongoose";

export interface IUser {
  username: string;
  groupId: string;
  profilPhoto: string;
}

const Userschema = new mongoose.Schema<IUser>({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups", // Référence au modèle Group
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilPhoto: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("users", Userschema);
