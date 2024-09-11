import mongoose from "mongoose";

export interface IDailyChallenge {
  _id: string;
  daysConnected: number;
  userId: string;
  connectedThisDay: boolean;
  emoji: 0 | 1 | 2 | 3 | 4 | 5;
}

export const DailyChallengeSchema = new mongoose.Schema<IDailyChallenge>({
  daysConnected: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  emoji: {
    type: Number,
    required: true,
  },
  connectedThisDay: {
    type: Boolean,
    required: true,
  },
});

export const DailyChallengeModel = mongoose.model(
  "dailyChallenge",
  DailyChallengeSchema
);
