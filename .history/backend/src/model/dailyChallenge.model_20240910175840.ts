import mongoose from "mongoose";

export interface IDailyChallenge {
  _id: string;
  daysConnected: number;
  userId: string;
  emoji: 0 | 1 | 2 | 3 | 4;
  emojisDaysConnected: [
    { 0: number },
    { 1: number },
    { 2: number },
    { 3: number },
    { 4: number }
  ];
}

export const DailyChallengeSchema = new mongoose.Schema<IDailyChallenge>({
  daysConnected: {
    type: Number,
    required: true,
  },
});
