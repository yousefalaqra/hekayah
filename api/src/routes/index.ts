// src/routes/index.ts

import express from 'express';
import feedRoutes from './feedRoutes';
import unitRoutes from './unitRoutes';

const router = express.Router();

router.use('/feeds', feedRoutes);
router.use('/units', unitRoutes);

export default router;
