import mongoose from "mongoose";

export interface IGroup {
  _id: string;
  groupName: string;
  groupCode: string;
  urlProfil: string;
  members: {
    pseudo: string;
    userId: string;
  }[];
}

const GroupSchema = new mongoose.Schema<IGroup>({
  groupName: {
    type: String,
    required: true,
  },
  groupCode: {
    type: String,
    required: true,
  },
  urlProfil: {
    type: String,
  },
  members: {
    type: [
      {
        pseudo: {
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