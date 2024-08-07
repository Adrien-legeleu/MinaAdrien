import mongoose from "mongoose";
import { IImage } from "./image.model";

interface ITheme {
  _id: string;
  title: string;
  groupId: string;
  bio: string;
  images: IImage[];
  isLiked: boolean;
}

const ThemeSchema = new mongoose.Schema<ITheme>(
  {
    title: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
      ref: "groups",
    },
    bio: {
      type: String,
    },
    images: {
      type: [
        {
          groupId: { type: String, required: true, ref: "groups" },
          url: { type: [String], required: true },
          legend: { type: String },
          photoDate: { type: String },
          isLiked: { type: Boolean, required: true, default: false },
        },
      ],
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ThemeModel = mongoose.model("themes", ThemeSchema);
