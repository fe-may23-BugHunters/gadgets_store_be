import express from 'express';
import * as OrdersController from '../controllers/orders';

export const router = express.Router();

router.get('/:userId', OrdersController.getAll);
router.post('/', OrdersController.addOrder);
