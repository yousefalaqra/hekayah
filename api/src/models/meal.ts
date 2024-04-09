import { FeedingTime } from "./feeding-time";
import { LifeStage } from "./life-stage";
import mongoose, { Document, Schema } from "mongoose";
import { Quantity, QuantitySchema } from "./quantity";

export enum MealCateoory {
  forage = "Forage",
  concentrate = "Concentrate",
}

interface MealPortion extends Document {
  feedId: mongoose.Types.ObjectId;
  quantity: Quantity;
}

const MealPortionSchema: Schema = new Schema({
  feedId: { type: mongoose.Types.ObjectId, required: true },
  quantity: { type: QuantitySchema },
});

export const MealPortionModel = mongoose.model<MealPortion>(
  "MealPortion",
  MealPortionSchema
);

export interface Meal {
  name: string;
  category: MealCateoory
  life_stage: LifeStage;
  feeding_time: FeedingTime;
  prep_method: string;
  portions: Array<MealPortion>;
  note: string;
}

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: MealCateoory },
  life_stage: { type: Schema.Types.ObjectId, ref: "LifeStage" },
  feeding_time: { type: Schema.Types.ObjectId, ref: "FeedingTime" },
  portions: [{ type: MealPortionSchema, ref: "MealPortion" }],
  prep_method: { type: String },
  note: { type: String },
});

export const MealModel = mongoose.model<Meal>("Meal", MealSchema);
