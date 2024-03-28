// src/routes/index.ts

import express from 'express';
import feedRoutes from './feed.routes';
import unitRoutes from './unit.routes';
import lifeStageRoutes from './life-stage.routes';
import feedingTimeRoutes from './feeding-time.routes';

const router = express.Router();

router.use('/feeds', feedRoutes);
router.use('/units', unitRoutes);
router.use('/lifeStages', lifeStageRoutes);
router.use('/feedingTimes', feedingTimeRoutes);

export default router;
