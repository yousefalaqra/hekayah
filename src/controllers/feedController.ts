// src/controllers/feedController.ts

import { Request, Response } from 'express';
import { Feed } from '../models'; // Automatically looks for index.ts

export const createFeed = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const feed = new Feed({ name });
    await feed.save();
    res.status(201).json(feed);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Implement other controller functions: getFeed, updateFeed, deleteFeed
