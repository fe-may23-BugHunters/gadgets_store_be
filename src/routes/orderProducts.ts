import express from 'express';
import * as OrdersProductsController from '../controllers/orderProducts';

export const router = express.Router();

router.post('/', OrdersProductsController.addOrderProduct);
