import express, { Router } from "express";
import {
    createFeedingTime,
    getAllFeedingTimes
} from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createFeedingTime);
router.get("/", getAllFeedingTimes);
// Implement other routes: get, put, delete

export default router;

