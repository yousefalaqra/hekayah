// src/controllers/feedController.ts

import { Request, Response } from "express";
import { LifeStageModel } from "../models"; // Automatically looks for index.ts

export const createLifeStage = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age_range,
      foal_age_range,
      nutritional_requirements,
      activity_level,
      pregnancy_trimester,
    } = req.body;

    const lifeStage = new LifeStageModel({
      name: name,
      age_range: age_range,
      foal_age_range: foal_age_range,
      nutritional_requirements: nutritional_requirements,
      activity_level: activity_level,
      pregnancy_trimester: pregnancy_trimester,
    });

    await lifeStage.save();
    res.status(201).json(lifeStage);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLifeStages = async (req: Request, res: Response) => {
  try {
    const lifeStages = await LifeStageModel.find().exec();
    res.status(200).json(lifeStages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
