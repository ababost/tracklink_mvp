import express from 'express';
import { config } from './config';
import { corsMiddleware } from './middleware/cors';
import testRoutes from './routes/test';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.json({ status: 'Backend server is running' });
});

// Routes
app.use('/api/test', testRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Frontend URL: ${config.frontend.url}`);
});
