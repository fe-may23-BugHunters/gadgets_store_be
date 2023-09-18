/* eslint-disable max-len */
import { OrderProducts } from '../utils/db_order_product';

export async function addOrderProduct(
  orderId :string,
  productId :string,
  quantity :string,
) {
  const newOrderProduct = await OrderProducts.create({ orderId, productId, quantity });

  return newOrderProduct;
}
