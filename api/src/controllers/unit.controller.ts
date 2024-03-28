// src/controllers/feedController.ts

import { Request, Response } from "express";
import { UnitModel } from "../models"; // Automatically looks for index.ts

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, abbreviation, type } = req.body;

    const unit = new UnitModel({
      name: name,
      abbreviation: abbreviation,
      type,
    });

    await unit.save();
    res.status(201).json(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUnits = async (req: Request, res: Response) => {
  try {
    const units = await UnitModel.find().exec();
    res.status(200).json(units);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
