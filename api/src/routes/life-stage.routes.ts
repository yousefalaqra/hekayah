
import express, { Router } from "express";
import {
    createLifeStage,
    getAllLifeStages
} from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createLifeStage);
router.get("/", getAllLifeStages);
// Implement other routes: get, put, delete

export default router;