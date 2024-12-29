// src/controllers/PromoterController.ts
import { Request, Response } from 'express';
import { PromoterModel } from '../models/PromoterModel';
import logger from '../utils/logger';

export class PromoterController {
  private promoterModel: PromoterModel;

  constructor() {
    this.promoterModel = new PromoterModel();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, city, venues } = req.body;
      logger.info('Creating new promoter', { email });

      const existing = await this.promoterModel.findByEmail(email);
      if (existing) {
        logger.warn('Duplicate promoter email', { email });
        return res.status(409).json({ error: 'Email already exists' });
      }

      const promoter = await this.promoterModel.create({
        name,
        email,
        city,
        venues
      });

      logger.info('Promoter created', { id: promoter.id });
      res.status(201).json(promoter);
    } catch (error) {
      logger.error('Failed to create promoter', { error });
      res.status(500).json({ error: 'Failed to create promoter' });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const { city } = req.query;
      const promoters = city 
        ? await this.promoterModel.findByCity(city as string)
        : await this.promoterModel.findAll();
      
      res.json(promoters);
    } catch (error) {
      logger.error('Failed to fetch promoters', { error });
      res.status(500).json({ error: 'Failed to fetch promoters' });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const promoter = await this.promoterModel.findById(req.params.id);
      if (!promoter) {
        return res.status(404).json({ error: 'Promoter not found' });
      }
      res.json(promoter);
    } catch (error) {
      logger.error('Failed to fetch promoter', { error, id: req.params.id });
      res.status(500).json({ error: 'Failed to fetch promoter' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const promoter = await this.promoterModel.update(req.params.id, req.body);
      if (!promoter) {
        return res.status(404).json({ error: 'Promoter not found' });
      }
      res.json(promoter);
    } catch (error) {
      logger.error('Failed to update promoter', { error, id: req.params.id });
      res.status(500).json({ error: 'Failed to update promoter' });
    }
  };
}

// src/controllers/GigController.ts
// ... similar pattern for GigController with validation and logging

// src/controllers/MessageController.ts
// ... similar pattern for MessageController with validation and logging