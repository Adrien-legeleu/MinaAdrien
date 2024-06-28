import mongoose from "mongoose";

export interface IImage {
  url: string;
  legend: string;
  datePhoto: Date;
  datePublication: Date;
  isLiked: boolean;
}
