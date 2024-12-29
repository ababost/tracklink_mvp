// src/routes/index.ts
import express from 'express';
import artistRoutes from './artist.routes';
import promoterRoutes from './promoter.routes';
import gigRoutes from './gig.routes';
import messageRoutes from './message.routes';

const router = express.Router();

router.use('/artists', artistRoutes);
router.use('/promoters', promoterRoutes);
router.use('/gigs', gigRoutes);
router.use('/messages', messageRoutes);

export default router;