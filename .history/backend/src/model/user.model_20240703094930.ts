import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  groups: [string];
  profilPhoto: string;
}

const Userschema = new mongoose.Schema<IUser>({
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
  groups: {
    type: {
      groupCode: string,
      groupName: string,
      urlProfil: string,
    },
  },
});

export const UserModel = mongoose.model("users", Userschema);
