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

// interface ProductInfo {
//   id: string;
//   category: string;
//   name: string;
//   priceRegular: number;
//   priceDiscount: number;
// }

// interface OrderDetail {
//   quantity: number;
//   product: ProductInfo;
// }

// export interface OrderResponse {
//   id: number;
//   totalItems: number;
//   totalPrice: number;
//   createdAt: Date;
//   details: OrderDetail[];
// }
