import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  groupId: string;
  password: string;
  profilPhoto: string;
}

const Userschema = new mongoose.Schema<IUser>({
  groupId: {
    type: String,
    ref: "groups",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilPhoto: {
    type: String,
  },
});

export const UserModel = mongoose.model("users", Userschema);
