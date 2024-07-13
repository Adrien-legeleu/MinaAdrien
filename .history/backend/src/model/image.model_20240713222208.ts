import mongoose from "mongoose";

export interface IImage {
  _id?: string;
  groupId: string;
  url: string[];
  legend?: string;
  datePhoto?: String;
  isLiked: boolean;
}

export const ImageSchema = new mongoose.Schema<IImage>(
  {
    url: {
      type: [String],
      required: true,
    },
    groupId: {
      type: String,
      required: true,
      ref: "groups",
    },
    legend: {
      type: String,
    },
    datePhoto: {
      type: String,
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

export const ImageModel = mongoose.model("images", ImageSchema);
