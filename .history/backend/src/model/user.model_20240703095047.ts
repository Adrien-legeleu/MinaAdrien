import { group } from "console";
import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  groups: {
    groupId: string;
    groupCode: string;
    groupName: string;
    urlProfil: string;
  }[];
  profilPhoto: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilPhoto: {
    type: String,
  },
  groups: [
    {
      groupId : {
        type:String,
        required:true,
        ref : "groups"
      }
      groupCode: {
        type: String,
        required: true,
      },
      groupName: {
        type: String,
        required: true,
      },
      urlProfil: {
        type: String,
      },
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
