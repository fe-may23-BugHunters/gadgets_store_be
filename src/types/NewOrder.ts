import { Model } from 'sequelize-typescript';

export interface NewOrder extends Model {
  id: string,
  userId: string,
  totalItems: number,
  totalPrice: number,
  createdAt: string,
}
