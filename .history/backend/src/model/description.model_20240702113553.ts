import mongoose from "mongoose";

export interface IDescription {
  _id: string;
  groupId: string;
  description: string;
  images: string;
  datePhoto: Date;
  isLiked: boolean;
}

export const DescriptionSchema = new mongoose.Schema<IDescription>(
  {
    description: {
      type: String,
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
      type: Date,
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

export const DescriptionModel = mongoose.model(
  "descriptions",
  DescriptionSchema
);
