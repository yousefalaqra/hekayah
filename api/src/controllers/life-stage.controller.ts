// src/controllers/feedController.ts

import { Request, Response } from "express";
import { LifeStageModel } from "../models"; // Automatically looks for index.ts

export const createLifeStage = async (req: Request, res: Response) => {
  try {
    const {
      age_range,
      work_level,
      gestation_stage,
    } = req.body;

    const lifeStage = new LifeStageModel({
      age_range: age_range,
      work_level: work_level,
      gestation_stage: gestation_stage,
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
