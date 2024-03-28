import mongoose, { Document, Schema } from "mongoose";

// Enum for activity levels. Source: https://ker.com/equinews/feeding-horses-based-work-level/
enum WorkLevel {
  LIGHT = "Light Exercise", // Up to 3 hours per week, examples: recreational riding, training start
  MODERATE = "Moderate Exercise", // 3-5 hours per week, examples: school horses, polo, ranch work
  HEAVY = "Heavy Work", // 4-5 hours per week, examples: ranch work, showing horses, eventing
  VERY_HEAVY = "Very Heavy Work", // Variable hours, examples: racing, endurance
}

// Enum for age stages of horse. Sources:
// https://en.wikipedia.org/wiki/Horse#:~:text=colors%2C%20and%20breeds.-,Lifespan%20and%20life%20stages,of%2025%20to%2030%20years.
// https://ker.com/equinews/prevalence-obesity-horses/
enum AgeRange {
  NEONATE_FOAL = "Neonate Foal", // Up to 2 weeks old
  SUCKLING_FOAL = "Suckling Foal", // 2 weeks to 4 months old
  WEANLING_FOAL = "Weanling Foal", // 4-6 months old
  YEARLING = "Yearling", // A horse between one and two years old
  COLT = "Colt", // Male horse under the age of four
  FILLY = "Filly", // Female horse under the age of four
  STALLION = "Stallion", // Non-castrated male horse four years old and older
  MARE = "Mare", // Female horse four years old and older
  Gelding = "Gelding", // Castrated male horse of any age
}

// Enum for pregnancy trimesters. Source: https://equine-reproduction.com/articles/mares/estrous-cycle
enum GestationStage {
  FIRST_TRIMESTER = "First Trimester", //  60-90 Days
  SECOND_TRIMESTER = "Second Trimester", // Day 114: Second trimester begins, Unitl Day 210
  THIRD_TRIMESTER = "Third Trimester", //  Day 226: Third trimester begins, ntill Day 340: Average foaling date
}

// Define an interface for the LifeStage document
interface LifeStage extends Document {
  name: string;
  age_range: AgeRange; // Optional for some stages
  nutritional_requirements: string;
  work_level: WorkLevel; // Use the enum
  gestation_stage?: GestationStage; // Use the enum
}

// Define the Mongoose schema
const LifeStageSchema = new Schema<LifeStage>({
  name: { type: String, required: true },
  age_range: { type: String, required: true },
  nutritional_requirements: { type: String, required: true },
  work_level: {
    type: String,
    enum: Object.values(WorkLevel),
  },
  gestation_stage: {
    type: String,
    enum: Object.values(GestationStage),
  }, // Trimester of pregnancy
});

// Define and export the LifeStage model
const LifeStageModel = mongoose.model<LifeStage>("LifeStage", LifeStageSchema);

export { LifeStage, LifeStageModel, WorkLevel, AgeRange, GestationStage };
