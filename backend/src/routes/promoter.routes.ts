// src/routes/promoter.routes.ts
import express from 'express';
import { PromoterController } from '../controllers/PromoterController';
import { validateRequest } from '../middleware/validateRequest';
import { promoterSchema } from '../schemas/validation';

const router = express.Router();
const promoterController = new PromoterController();

router.post('/', validateRequest(promoterSchema), promoterController.create);
router.get('/', promoterController.findAll);
router.get('/:id', promoterController.findById);
router.put('/:id', validateRequest(promoterSchema), promoterController.update);

export default router;