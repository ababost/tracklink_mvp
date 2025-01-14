import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

export default router;