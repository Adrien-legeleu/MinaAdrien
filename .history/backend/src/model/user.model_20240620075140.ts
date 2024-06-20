import mongoose from "mongoose";

export interface IUser {
  username: string;
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
  profilPhoto: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("users", Userschema);
