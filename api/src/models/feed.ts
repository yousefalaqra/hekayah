// src/models/feed.ts

import mongoose, { Document, Schema } from 'mongoose';
import { Brand } from './brand';
import { Quantity, QuantitySchema } from './quantity';


enum Category{
  forages = "Forages", 
  grains  ="Grains", 
  balancers_supplements = "Balancers & Supplements",
  complete_feeds ="Complete Feeds"
}

export interface Feed extends Document {
  name: string;
  brand: Brand;
  quantity: Quantity
  category: Category
  note: string
}



const feedSchema: Schema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    quantity: { type: QuantitySchema, required: true, ref: 'Quantity' },
    category: {type: Category, required: true},
    note: {type: String},
});


export const FeedModel = mongoose.model<Feed>('Feed', feedSchema);

