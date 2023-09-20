/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
import { Model } from 'sequelize-typescript';
import { Orders } from '../utils/db_order';
import { OrderProducts } from '../utils/db_order_product';
import { Product } from '../utils/db_product_table';
import { addOrderProduct } from './orderProducts';
import { NewOrder, Order } from '../types/NewOrder';
import { Category } from '../types/Category';

export type PreparedProduct = {
  id: string,
  category: Category,
  name: string,
  priceRegular: number,
  priceDiscount: number,
}

export type Details = {
  quantity: number,
  product: PreparedProduct,
}

export type PreparedOrder = {
  id: string,
  totalItems: number,
  totalPrice: number,
  createdAt: string,
  details: Details,
}

export async function getAll(userId: string) {
  const orders: any = await Orders.findAll({
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
    raw: true,
    nest: true,
    plain: false,
  });

  const preparedDetails = orders.map((order: PreparedOrder) => order.details);

  const res = [{ ...orders[0], details: preparedDetails }];

  return res;
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
