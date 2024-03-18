// src/routes/feedRoutes.ts

import express, { Router } from 'express';
import { createFeed, getAllFeeds, getFeedById } from '../controllers'; // Automatically looks for index.ts

const router: Router = express.Router();

router.post('/', createFeed);
router.get('/', getAllFeeds);
router.get('/:feedId', getFeedById);
// Implement other routes: get, put, delete

export default router;
