// src/controllers/GigController.ts
import { Request, Response } from 'express';
import { GigModel } from '../models/GigModel';
import { MessageModel } from '../models/MessageModel';
import { Gig } from '../types';
import logger from '../utils/logger';

export class GigController {
  private gigModel: GigModel;
  private messageModel: MessageModel;

  constructor() {
    this.gigModel = new GigModel();
    this.messageModel = new MessageModel();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { artist_id, promoter_id, venue, date, fee, details } = req.body;
      logger.info('Creating new gig', { artist_id, venue, date });

      const gig = await this.gigModel.create({
        artist_id,
        promoter_id,
        venue,
        date: new Date(date),
        status: 'pending',
        fee,
        details,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Create initial booking request message
      await this.messageModel.create({
        gig_id: gig.id,
        type: 'email',
        content: `New booking request for ${venue} on ${new Date(date).toLocaleDateString()}`,
        status: 'sent',
        created_at: new Date(),
        updated_at: new Date()
      });

      logger.info('Gig created successfully', { gigId: gig.id });
      res.status(201).json(gig);

    } catch (error) {
      logger.error('Failed to create gig', { error });
      res.status(500).json({ error: 'Failed to create gig' });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info('Fetching gig details', { gigId: id });

      const gig = await this.gigModel.getGigWithDetails(id);
      if (!gig) {
        logger.warn('Gig not found', { gigId: id });
        return res.status(404).json({ error: 'Gig not found' });
      }

      // Get messages for this gig
      const messages = await this.messageModel.findByGig(id);
      
      const response = {
        ...gig,
        messages
      };

      logger.info('Gig details retrieved successfully', { gigId: id });
      res.json(response);

    } catch (error) {
      logger.error('Failed to fetch gig', { error, gigId: req.params.id });
      res.status(500).json({ error: 'Failed to fetch gig' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      logger.info('Updating gig status', { gigId: id, status });

      const gig = await this.gigModel.updateStatus(id, status);
      if (!gig) {
        logger.warn('Gig not found for status update', { gigId: id });
        return res.status(404).json({ error: 'Gig not found' });
      }

      // Create status update message
      await this.messageModel.create({
        gig_id: id,
        type: 'chat',
        content: `Gig status updated to ${status}`,
        status: 'sent',
        created_at: new Date(),
        updated_at: new Date()
      });

      logger.info('Gig status updated successfully', { gigId: id, status });
      res.json(gig);

    } catch (error) {
      logger.error('Failed to update gig status', { error, gigId: req.params.id });
      res.status(500).json({ error: 'Failed to update gig status' });
    }
  };

  getArtistGigs = async (req: Request, res: Response) => {
    try {
      const { artistId } = req.params;
      const { status, timeframe } = req.query;
      logger.info('Fetching artist gigs', { artistId, status, timeframe });

      let gigs: Gig[];

      if (timeframe === 'upcoming') {
        gigs = await this.gigModel.findUpcoming(artistId);
      } else if (timeframe === 'past') {
        gigs = await this.gigModel.findPast(artistId);
      } else {
        gigs = await this.gigModel.findAll({ artist_id: artistId });
      }

      // Filter by status if provided
      if (status) {
        gigs = gigs.filter(gig => gig.status === status);
      }

      logger.info('Artist gigs retrieved successfully', { 
        artistId, 
        gigCount: gigs.length 
      });
      res.json(gigs);

    } catch (error) {
      logger.error('Failed to fetch artist gigs', { 
        error, 
        artistId: req.params.artistId 
      });
      res.status(500).json({ error: 'Failed to fetch artist gigs' });
    }
  };

  getPromoterGigs = async (req: Request, res: Response) => {
    try {
      const { promoterId } = req.params;
      const { status } = req.query;
      logger.info('Fetching promoter gigs', { promoterId, status });

      let gigs = await this.gigModel.findAll({ promoter_id: promoterId });

      // Filter by status if provided
      if (status) {
        gigs = gigs.filter(gig => gig.status === status);
      }

      logger.info('Promoter gigs retrieved successfully', { 
        promoterId, 
        gigCount: gigs.length 
      });
      res.json(gigs);

    } catch (error) {
      logger.error('Failed to fetch promoter gigs', { 
        error, 
        promoterId: req.params.promoterId 
      });
      res.status(500).json({ error: 'Failed to fetch promoter gigs' });
    }
  };

  updateGigDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      logger.info('Updating gig details', { gigId: id });

      const gig = await this.gigModel.update(id, {
        ...updateData,
        updated_at: new Date()
      });

      if (!gig) {
        logger.warn('Gig not found for update', { gigId: id });
        return res.status(404).json({ error: 'Gig not found' });
      }

      logger.info('Gig updated successfully', { gigId: id });
      res.json(gig);

    } catch (error) {
      logger.error('Failed to update gig', { error, gigId: req.params.id });
      res.status(500).json({ error: 'Failed to update gig' });
    }
  };

  deleteGig = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info('Deleting gig', { gigId: id });

      const result = await this.gigModel.delete(id);
      if (!result) {
        logger.warn('Gig not found for deletion', { gigId: id });
        return res.status(404).json({ error: 'Gig not found' });
      }

      logger.info('Gig deleted successfully', { gigId: id });
      res.status(204).send();

    } catch (error) {
      logger.error('Failed to delete gig', { error, gigId: req.params.id });
      res.status(500).json({ error: 'Failed to delete gig' });
    }
  };
}