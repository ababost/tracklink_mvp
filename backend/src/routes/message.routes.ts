// src/routes/message.routes.ts
import express from 'express';
import { MessageController } from '../controllers/MessageController';
import { validateRequest } from '../middleware/validateRequest';
import { messageSchema } from '../schemas/validation';

const router = express.Router();
const messageController = new MessageController();

router.post('/', validateRequest(messageSchema), messageController.create);
router.get('/gig/:gigId', messageController.getThreadByGig);
router.get('/artist/:artistId', messageController.getArtistMessages);

export default router;