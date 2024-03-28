import mongoose, { Schema } from "mongoose";

export interface FeedingTime {
  name: string;
  time: String;
}


const FeedingTimeSchema: Schema = new Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
});

export const FeedingTimeModel = mongoose.model<FeedingTime>('FeedingTime', FeedingTimeSchema);

