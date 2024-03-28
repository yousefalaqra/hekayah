// src/controllers/feedController.ts

import { Request, Response } from "express";
import { FeedingTimeModel } from "../models"; // Automatically looks for index.ts

export const createFeedingTime = async (req: Request, res: Response) => {
  try {
    const { name, time } = req.body;

    const feedingTime = new FeedingTimeModel({
      name: name,
      time: time,
    });

    await feedingTime.save();
    res.status(201).json(feedingTime);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeedingTimes = async (req: Request, res: Response) => {
  try {
    const feedingTimes = await FeedingTimeModel.find().exec();
    res.status(200).json(feedingTimes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
