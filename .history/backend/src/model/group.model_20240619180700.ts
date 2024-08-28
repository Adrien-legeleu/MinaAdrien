import mongoose from "mongoose";

export interface IGroup {
  _id: string;
  groupname: string;
  password: string;
  profilPhoto: string;
}

const GroupSchema = new mongoose.Schema<IGroup>({
  groupname: {
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

export const GroupModel = mongoose.model("groups", GroupSchema);
