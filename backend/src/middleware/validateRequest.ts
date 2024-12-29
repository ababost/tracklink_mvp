// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../utils/logger';


export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      logger.warn('Request validation failed', { error });
      res.status(400).json({ error: 'Invalid request data', details: error})
    }
  };
};

