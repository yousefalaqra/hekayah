// src/controllers/feedController.ts

import { Request, Response } from "express";
import { FeedModel, BrandModel } from "../models"; // Automatically looks for index.ts
import mongoose from "mongoose";

export const createFeed = async (req: Request, res: Response) => {
  try {
    const { name, brandId, quantity, category } = req.body;

    const feed = new FeedModel({
      name: name,
      brand: new mongoose.Types.ObjectId(brandId),
      quantity: quantity,
      category: category,
    });

    await feed.save();
    res.status(201).json(feed);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await FeedModel.find().exec();
    res.status(200).json(feeds);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedById = async (req: Request, res: Response) => {
  try {
    const feedId = req.params.feedId;
    const feed = await FeedModel.findById(feedId).exec();
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    res.status(200).json(feed);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedsBrands = async (req: Request, res: Response) => {
  try {
    const feedsBrands = await BrandModel.find().exec();
    res.status(200).json(feedsBrands);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createFeedsBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const brand = new BrandModel({
      name: name,
    });

    await brand.save();
    res.status(201).json(brand);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
