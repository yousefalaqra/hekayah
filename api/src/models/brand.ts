import mongoose, { Schema } from 'mongoose';

export interface Brand {
  name: string;
}

const brandSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const BrandModel = mongoose.model<Brand>('Brand', brandSchema);
