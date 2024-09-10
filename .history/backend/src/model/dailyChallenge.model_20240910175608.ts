import mongoose from "mongoose";

export interface IDailyChallenge {
  _id: string;
  daysConnected: number;
  emoji: 0 | 1 | 2 | 3 | 4;
  emojisDaysConnected: [{ 0: number }, { 1: number }];
}
