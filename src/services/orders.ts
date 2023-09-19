import { Model } from 'sequelize-typescript';
import { Orders } from '../utils/db_order';
import { OrderProducts } from '../utils/db_order_product';
import { Product } from '../utils/db_product_table';
import { addOrderProduct } from './orderProducts';
import { NewOrder, Order } from '../types/NewOrder';

export function getAll(userId: string) {
  const orders = Orders.findAll({
    where: { userId },
    include: [
      {
        model: OrderProducts,
        as: 'details',
        attributes: ['quantity'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: [
              'id',
              'category',
              'name',
              'priceRegular',
              'priceDiscount',
            ],
          },
        ],
      },
    ],
    attributes: ['id', 'totalItems', 'totalPrice', 'createdAt'],
  });

  return orders;
}

export async function addOrder({
  userId,
  totalItems,
  totalPrice,
  products,
}: Order) {
  const newOrder = await Orders.create(
    { userId, totalItems, totalPrice },
  ) as unknown as Promise<Model<NewOrder>>;

  const items = [];

  for (let i = 0; i < products.length; i++) {
    const item = await addOrderProduct(
      (await newOrder)?.id,
      products[i].productId,
      products[i].quantity.toString(),
    );

    items.push(item);
  }

  return { newOrder, items };
}
