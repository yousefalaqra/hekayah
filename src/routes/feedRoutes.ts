// src/routes/feedRoutes.ts

import express, { Router } from 'express';
import { createFeed } from '../controllers'; // Automatically looks for index.ts

const router: Router = express.Router();

router.post('/', createFeed);
// Implement other routes: get, put, delete

export default router;
