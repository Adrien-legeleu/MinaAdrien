import mongoose from "mongoose";

export interface IImage {
  _id: string;
  url: string;
  legend: string;
  datePhoto: Date;
  isLiked: boolean;
}

export const ImageModel = new mongoose.Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
