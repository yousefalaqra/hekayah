import express, { Router } from "express";
import {
  createMeal,
  getAllMeals,
  getMealById,
  createMealPortition,
  removeMealPortition,
} from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createMeal);
router.get("/", getAllMeals);
router.get("/:mealId", getMealById);
router.post("/:mealId/portions", createMealPortition);
router.delete("/:mealId/portions", removeMealPortition);
// Implement other routes: get, put, delete

export default router;
