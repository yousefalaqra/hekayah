import express, { Router } from "express";
import { createMeal, getAllMeals, getMealById } from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createMeal);
router.get("/", getAllMeals);
router.get("/:mealId", getMealById);
// Implement other routes: get, put, delete

export default router;
