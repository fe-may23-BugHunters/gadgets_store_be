/* eslint-disable no-shadow */
import * as OrdersProductsService from '../services/orderProducts';
import { Request, Response } from 'express';

export async function addOrderProduct(
  req: Request,
  res: Response,
) {
  try {
    const result = await OrdersProductsService.addOrderProduct(
      req.query.orderId as string,
      req.query.productId as string,
      req.query.quantity as string,
    );

    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json({ error: 'Failed to add order' });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
