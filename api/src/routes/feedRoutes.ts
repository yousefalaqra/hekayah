// src/routes/feedRoutes.ts

import express, { Router } from "express";
import {
  createFeed,
  getAllFeeds,
  getFeedById,
  getFeedsBrands,
  createFeedsBrand
} from "../controllers"; // Automatically looks for index.ts

const router: Router = express.Router();

router.post("/", createFeed);
router.get("/", getAllFeeds);
router.get("/brands", getFeedsBrands);
router.post("/brands", createFeedsBrand);
router.get("/:feedId", getFeedById);
// Implement other routes: get, put, delete

export default router;
