// src/routes/feedRoutes.ts

import express, { Router } from "express";
import {
    createUnit,
    getAllUnits
} from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createUnit);
router.get("/", getAllUnits);
// Implement other routes: get, put, delete

export default router;
