/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { sequelize } from './db';
import { DataType } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';

export const Orders = sequelize.define('Orders', {
  id: {
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v1()'),
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataType.STRING,
    allowNull: false,
  },
  totalItems: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}, {
  modelName: 'orders',
  updatedAt: false,
});

Orders.sync()
  .then(() => {
    console.log('Table synced with database');
  })
  .catch((error: any) => {
    console.error('Error syncing table:', error);
  });
