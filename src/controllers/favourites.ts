/* eslint-disable max-len */
/* eslint-disable no-shadow */
import * as FavouritesService from '../services/favourites';
import { Request, Response } from 'express';

export async function getAll(
  req: Request,
  res: Response,
) {
  try {
    const result = await FavouritesService.getAll(req.params.userId);

    if (!result) {
      return res.status(404).json({ error: 'Favourites not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function addFavourite(
  req: Request,
  res: Response,
) {
  try {
    const result = await FavouritesService.addFavourite(req.params.userId, req.params.productId);

    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json({ error: 'Failed to add favourite' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteFavourite(
  req: Request,
  res: Response,
) {
  try {
    const result = await FavouritesService.deleteFavourite(req.params.userId, req.params.productId);

    if (result !== undefined) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: 'Favourite not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
