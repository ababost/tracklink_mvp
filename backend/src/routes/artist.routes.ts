// src/routes/artist.routes.ts
import express from 'express';
import { ArtistController } from '../controllers/ArtistController';

const router = express.Router();
const artistController = new ArtistController();

router.post('/', artistController.create);
router.get('/', artistController.findAll);
router.get('/:id', artistController.findById);
router.put('/:id', artistController.update);
router.delete('/:id', artistController.delete);
router.get('/:id/gigs', artistController.getGigs);
router.put('/:id/availability', artistController.updateAvailability);

export default router;