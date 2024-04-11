// src/controllers/feedController.ts

import { Request, Response } from "express";
import { MealModel, MealPortionModel, QuantityModel } from "../models"; // Automatically looks for index.ts
import mongoose from "mongoose";

export const createMeal = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const meal = new MealModel({
      name: name,
    });

    await meal.save();
    res.status(201).json(meal);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealModel.find().exec();
    res.status(200).json(meals);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.mealId;
    const meal = await MealModel.findById(mealId).exec();
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json(meal);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMealPortition = async (req: Request, res: Response) => {
  const mealId = req.params.mealId;
  const { feedId, quantity } = req.body; // Assuming portionId is a valid MealPortion document ID

  try {
    const meal = await MealModel.findById(mealId);

    if (!meal) {
      return res.status(404).send("Meal not found");
    }

    const quantityModel = new QuantityModel({
      amount: quantity.amount,
      unit: new mongoose.Types.ObjectId(quantity.unit),
    });

    const mealPortitionModel = new MealPortionModel({
      feedId: mongoose.Types.ObjectId(feedId),
      quantity: quantityModel,
    });

    meal.portions.push(mealPortitionModel); // Add the portion ID to the meal's portions array
    await meal.save();

    res.status(201).json(meal);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeMealPortition = async (req: Request, res: Response) => {
  const mealId = req.params.mealId;
  const feedId = req.params.feedId;

  try {
    const meal = await MealModel.findById(mealId);

    if (!meal) {
      return res.status(404).send("Meal not found");
    }

    const feedObjectId = mongoose.Types.ObjectId(feedId);
    const portion = meal.portions.find((x) => x.feedId === feedObjectId);
    if (!portion) {
      return res.status(404).json({ message: "Meal portion not found" });
    }

    meal.portions.filter((x) => x.feedId !== feedObjectId); // Remove the portion ID from the meal's portions array
    await meal.save();

    res.status(200).json(meal);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
