import mongoose from "mongoose";

export interface IGroup {
  _id: string;
  groupname: string;
  password: string;
  profilPhoto: string;
  members: {
    pseudoUser: string;
    userid: mongoose.Schema.Types.ObjectId;
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
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const GroupModel = mongoose.model("groups", GroupSchema);
