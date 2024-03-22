// src/controllers/feedController.ts

import { Request, Response } from "express";
import { UnitModel } from "../models"; // Automatically looks for index.ts

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, abbreviation, type } = req.body;

    const feed = new UnitModel({
      name: name,
      abbreviation: abbreviation,
      type,
    });

    await feed.save();
    res.status(201).json(feed);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUnits = async (req: Request, res: Response) => {
  try {
    const feeds = await UnitModel.find().exec();
    res.status(200).json(feeds);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
