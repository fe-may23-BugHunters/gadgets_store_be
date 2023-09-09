/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-len */
// import { Favourite } from '../types/Favourite';
import { Favourites } from '../utils/db_favourites';
import { Product } from '../utils/db_product_table';

export function getAll(userId: string) {
  return Favourites.findAll({
    where: { userId },
    include: [
      { model: Product, as: 'product' },
    ],
  });
}

export async function addFavourite(userId :string, productId: string | undefined) {
  const response = await Favourites.findOne({
    where: {
      productId,
      userId,
    },
  });

  if (response) {
    throw new Error('This product is already in Favourites');
  }

  const newFavouriteItem = await Favourites.create({ userId, productId });

  return newFavouriteItem;
}

export async function deleteFavourite(userId :string, productId: string | undefined) {
  const result = await Favourites.destroy({
    where: {
      userId,
      productId,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        console.log('Task deleted successfully.');
      } else {
        console.log('Task not found.');
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });

  return result;
}
