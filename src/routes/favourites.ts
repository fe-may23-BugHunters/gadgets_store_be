import express from 'express';
import * as FavouritesController from '../controllers/favourites';

export const router = express.Router();

router.get('/:userId', FavouritesController.getAll);
router.post('/:userId/:productId', FavouritesController.addFavourite);
router.delete('/:userId/:productId', FavouritesController.deleteFavourite);
