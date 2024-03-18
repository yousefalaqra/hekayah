import mongoose from 'mongoose';
import { Unit } from './unit';
  

export interface Quantity {
    amount: number;
    unit: Unit;
  }


  export const QuantitySchema = new mongoose.Schema<Quantity>({
  amount: { type: Number, required: true },
  unit: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Unit' },
}, {_id: false});