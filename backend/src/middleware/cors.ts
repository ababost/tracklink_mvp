import cors from 'cors';
import { config } from '../config';

export const corsMiddleware = cors({
  origin: config.frontend.url,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});
