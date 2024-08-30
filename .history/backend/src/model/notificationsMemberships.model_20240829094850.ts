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
});
