import mongoose from "mongoose";

export interface IGroup {
  _id: string;
  groupname: string;
  password: string;
  profilPhoto: string;
  members: {
    pseudoUser: string;
    userId: string;
    _id: string;
  }[];
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
  members: {
    type: [
      {
        pseudoUser: {
          type: String,
        },
        userId: {
          type: String,
          ref: "users",
        },
      },
    ],
    required: true,
  },
});

export const GroupModel = mongoose.model("groups", GroupSchema);
