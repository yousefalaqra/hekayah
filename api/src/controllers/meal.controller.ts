// src/controllers/feedController.ts

import { Request, Response } from "express";
import { MealModel} from "../models"; // Automatically looks for index.ts

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

