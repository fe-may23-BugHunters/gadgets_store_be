import { Model } from 'sequelize-typescript';

export interface NewOrder extends Model {
  id: string,
  userId: string,
  totalItems: number,
  totalPrice: number,
  createdAt: string,
}

export interface OrderProducts {
  productId: string;
  quantity: number;
}

export interface Order {
  userId: string;
  totalItems: number;
  totalPrice: number;
  products: OrderProducts[];
}
