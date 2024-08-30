import mongoose from "mongoose";

export interface INotificationsMemberships {
  _id: string;
  userId: string;
  groupId: string[];
  subscription: Object;
}

const subscriptionSchema = new mongoose.Schema<INotificationsMemberships>({
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: [String],
    required: true,
  },
  subscription: {
    type: Object,
    required: true,
  },
});

export const MemberShips = mongoose.model("subscription", subscriptionSchema);
