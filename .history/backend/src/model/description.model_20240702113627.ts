import mongoose from "mongoose";

export interface IDescription {
  _id: string;
  groupId: string;
  description: string;
  images: [string];
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
      type: [String],
      required: true,
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
