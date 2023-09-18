/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-len */
import { Model } from 'sequelize-typescript';
import { ShortHandProduct } from '../types/Product';
import { Orders } from '../utils/db_order';
import { OrderProducts } from '../utils/db_order_product';
import { Product } from '../utils/db_product_table';
import { addOrderProduct } from './orderProducts';
import { NewOrder } from '../types/NewOrder';

export function getAll(userId: string) {
  return Orders.findAll({
    where: { userId },
    include: [
      { model: OrderProducts, as: 'details', include: [{ model: Product, as: 'product' }] },
    ],
  });
}

export async function addOrder(
  userId :string,
  totalItems: number,
  totalPrice: number,
  products: string,
) {
  const newOrder = await Orders.create(
    { userId, totalItems, totalPrice },
  ) as unknown as Promise<Model<NewOrder>>;

  const items = [];
  const validProducts: ShortHandProduct[] = JSON.parse(products);

  for (let i = 0; i < validProducts.length; i++) {
    const item = await addOrderProduct(
      (await newOrder)?.id,
      validProducts[i].productId,
      validProducts[i].quantity,
    );

    items.push(item);
  }

  return { newOrder, items };
}
