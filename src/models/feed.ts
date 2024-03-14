// src/models/feed.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface Feed extends Document {
  name: string;
}

const feedSchema: Schema = new Schema({
    name: { type: String, required: true },
});

export const Feed = mongoose.model<Feed>('Feed', feedSchema);

