import mongoose from "mongoose";
import { IImage } from "./image.model";

interface ITheme {
  _id: string;
  title: string;
  groupId: string;
  bio: string;
  images: IImage[];
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
          _id: { type: String },
          groupId: { type: String, required: true },
          url: { type: String, required: true },
          legend: { type: String },
          datePhoto: { type: Date, required: true },
          isLiked: { type: Boolean, required: true, default: false },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ThemeModel = mongoose.model("themes", ThemeSchema);
