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
  userId: {
    type: String,
    required: true,
  },
  emoji: {
    type: Number,
    required: true,
  },
  emojisDaysConnected: {
    type: [
      { 0: Number },
      { 1: Number },
      { 2: Number },
      { 3: Number },
      { 4: Number },
    ],
    required: true,
  },
});

export const DailyChallengeModel = mongoose.model(
  "dailyChallenge",
  DailyChallengeSchema
);
