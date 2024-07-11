import mongoose from "mongoose";

interface ITheme {
  _id: string;
  title: string;
  bio: string;
  images: [
    {
      _id: string;
      groupId: string;
      url: string[];
      legend?: string;
      datePhoto: Date;
      isLiked: boolean;
    }
  ];
}

export const ThemeSchema = new mongoose.Schema<ITheme>(
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

export const ImageModel = mongoose.model("images", ThemeSchema);
