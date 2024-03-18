import mongoose from 'mongoose';


export interface Unit {
    en: string;    
  }

  export const UnitSchema = new mongoose.Schema<Unit>({
    en: { type: String, required: true },    
  });
