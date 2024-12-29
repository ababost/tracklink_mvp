// src/routes/gig.routes.ts
import express from 'express';
import { GigController } from '../controllers/GigController';
import { validateRequest } from '../middleware/validateRequest';
import { gigSchema, updateGigStatusSchema } from '../schemas/validation';

const router = express.Router();
const gigController = new GigController();

// Create new gig
router.post('/', validateRequest(gigSchema), gigController.create);

// Get gig by ID
router.get('/:id', gigController.findById);

// Update gig status
router.put('/:id/status', validateRequest(updateGigStatusSchema), gigController.updateStatus);

// Update gig details
router.put('/:id', validateRequest(gigSchema), gigController.updateGigDetails);

// Delete gig
router.delete('/:id', gigController.deleteGig);

// Get gigs by artist
router.get('/artist/:artistId', gigController.getArtistGigs);

// Get gigs by promoter
router.get('/promoter/:promoterId', gigController.getPromoterGigs);

export default router;