import mongoose from "mongoose";

export interface IDailyChallenge {
  _id: string;
  daysConnected: number;
  emoji: 0 | 1 | 2 | 3;
}
