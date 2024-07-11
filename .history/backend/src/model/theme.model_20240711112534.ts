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
