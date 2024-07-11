import mongoose from "mongoose";

interface ITheme {
  _id: string;
  title: string;
  groupId:string
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
    title: {
      type:,
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
      type:[
    {
      _id: string;
      groupId: string;
      url: string[];
      legend?: string;
      datePhoto: Date;
      isLiked: boolean;
    }
  ],
      required: true,

    },
  },
  {
    timestamps: true,
  }
);

export const ImageModel = mongoose.model("images", ThemeSchema);
