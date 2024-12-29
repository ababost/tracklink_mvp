// src/controllers/ArtistController.ts
import { Request, Response } from 'express';
import { ArtistModel } from '../models/ArtistModel';
import { GigModel } from '../models/GigModel';

export class ArtistController {
  private artistModel: ArtistModel;
  private gigModel: GigModel;

  constructor() {
    this.artistModel = new ArtistModel();
    this.gigModel = new GigModel();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, bio, spotify_url, soundcloud_url, instagram_url } = req.body;
      
      // Check if artist already exists
      const existing = await this.artistModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ 
          error: 'Artist with this email already exists' 
        });
      }

      const artist = await this.artistModel.create({
        name,
        email,
        bio,
        spotify_url,
        soundcloud_url,
        instagram_url
      });

      res.status(201).json(artist);
    } catch (error) {
      console.error('Error creating artist:', error);
      res.status(500).json({ 
        error: 'Failed to create artist' 
      });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const artists = await this.artistModel.findAll();
      res.json(artists);
    } catch (error) {
      console.error('Error finding artists:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve artists' 
      });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const artist = await this.artistModel.findById(req.params.id);
      if (!artist) {
        return res.status(404).json({ 
          error: 'Artist not found' 
        });
      }
      res.json(artist);
    } catch (error) {
      console.error('Error finding artist:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve artist' 
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const artist = await this.artistModel.update(id, updateData);
      if (!artist) {
        return res.status(404).json({ 
          error: 'Artist not found' 
        });
      }

      res.json(artist);
    } catch (error) {
      console.error('Error updating artist:', error);
      res.status(500).json({ 
        error: 'Failed to update artist' 
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const result = await this.artistModel.delete(id);
      if (!result) {
        return res.status(404).json({ 
          error: 'Artist not found' 
        });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting artist:', error);
      res.status(500).json({ 
        error: 'Failed to delete artist' 
      });
    }
  };

  getGigs = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      
      const artist = await this.artistModel.findById(id);
      if (!artist) {
        return res.status(404).json({ 
          error: 'Artist not found' 
        });
      }

      let gigs;
      if (status === 'upcoming') {
        gigs = await this.gigModel.findUpcoming(id);
      } else if (status === 'past') {
        gigs = await this.gigModel.findPast(id);
      } else {
        gigs = await this.gigModel.findAll({ artist_id: id });
      }

      res.json(gigs);
    } catch (error) {
      console.error('Error retrieving gigs:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve gigs' 
      });
    }
  };

  updateAvailability = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { availability } = req.body;

      const artist = await this.artistModel.updateAvailability(id, availability);
      if (!artist) {
        return res.status(404).json({ 
          error: 'Artist not found' 
        });
      }

      res.json(artist);
    } catch (error) {
      console.error('Error updating availability:', error);
      res.status(500).json({ 
        error: 'Failed to update availability' 
      });
    }
  };
}