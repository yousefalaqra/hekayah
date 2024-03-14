// src/routes/index.ts

import express from 'express';
import feedRoutes from './feedRoutes';

const router = express.Router();

router.use('/feeds', feedRoutes);

export default router;
