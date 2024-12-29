// src/schemas/validation.ts
import { z } from 'zod';

export const promoterSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    city: z.string().optional(),
    venues: z.array(z.string()).optional()
  })
});

export const gigSchema = z.object({
  body: z.object({
    artist_id: z.string().uuid(),
    promoter_id: z.string().uuid(),
    venue: z.string().min(1),
    date: z.string().datetime(),
    fee: z.number().positive().optional(),
    details: z.record(z.any()).optional()
  })
});

export const messageSchema = z.object({
  body: z.object({
    gig_id: z.string().uuid(),
    type: z.enum(['email', 'chat']),
    content: z.string().min(1),
    status: z.string().optional()
  })
});

export const updateGigStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'])
  }),
  params: z.object({
    id: z.string().uuid()
  })
});