/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { sequelize } from './db';
import { DataType } from 'sequelize-typescript';
import { Product } from './db_product_table';
import { Orders } from './db_order';

export const OrderProducts = sequelize.define('OrderProducts', {
  productId: {
    type: DataType.UUID,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  orderId: {
    type: DataType.UUID,
    references: {
      model: Orders,
      key: 'id',
    },
    allowNull: false,
  },
  quantity: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}, {
  modelName: 'orderProducts',
  updatedAt: false,
});

Product.hasMany(OrderProducts, {
  foreignKey: 'id', 'as': 'orderProducts',
});

OrderProducts.belongsTo(Product, {
  foreignKey: 'productId', 'as': 'product',
});

Orders.hasMany(OrderProducts, {
  foreignKey: 'orderId', 'as': 'details',
});

OrderProducts.belongsTo(Orders, {
  foreignKey: 'id', 'as': 'order',
});

OrderProducts.removeAttribute('id');

OrderProducts.sync()
  .then(() => {
    console.log('Table synced with database');
  })
  .catch((error: any) => {
    console.error('Error syncing table:', error);
  });
