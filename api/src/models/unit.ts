import mongoose from 'mongoose';

export enum UnitType{
  weight = 'weight',
  volume = 'volume'
}

export interface Unit {
    name: string,
    abbreviation: string,
    type:  UnitType
  }

  export const UnitSchema = new mongoose.Schema<Unit>({
    name: { type: String, required: true },    
    abbreviation: {type: String, required: true}, 
    type: {type: UnitType, required: true}
  });

  export const UnitModel = mongoose.model<Unit>('Unit', UnitSchema);
