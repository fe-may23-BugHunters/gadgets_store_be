/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
import * as OrdersService from '../services/orders';
import { Request, Response } from 'express';

export async function getAll(
  req: Request,
  res: Response,
) {
  try {
    const result = await OrdersService.getAll(req.params.userId);

    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function addOrder(
  req: Request,
  res: Response,
) {
  try {
    const result = await OrdersService.addOrder(
      req.query.userId as string,
      +(req.query.totalItems as string),
      +(req.query.totalPrice as string),
      req.query.products as string,
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
