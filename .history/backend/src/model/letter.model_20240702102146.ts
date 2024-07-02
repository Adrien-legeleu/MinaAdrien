import mongoose from "mongoose";

export interface ILetter {
  _id: string;
  title: string;
  url_image: string;
  isLiked: boolean;
}
