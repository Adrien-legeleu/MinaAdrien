import mongoose from "mongoose";

export interface ILetter {
  _id: string;
  groupId: string;
  title: string;
  text: string;
  url_image: string;
  isLiked: boolean;
}

export const LetterSchema = new mongoose.Schema<ILetter>(
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
    text: {
      type: String,
      required: true,
    },
    url_image: {
      type: String,
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

export const LetterModel = mongoose.model("letters", LetterSchema);
