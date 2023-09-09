/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import { sequelize } from './db';
import { DataType } from 'sequelize-typescript';

export const Product = sequelize.define('Product', {
  id: {
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v1()'),
    allowNull: false,
    primaryKey: true,
  },
  namespaceId: {
    type: DataType.STRING,
    allowNull: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  category: {
    type: DataType.ENUM('phones', 'tablests', 'accessories'),
    allowNull: false,
  },
  capacityAvailable: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
  capacity: {
    type: DataType.STRING,
    allowNull: false,
  },
  priceRegular: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  priceDiscount: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  colorsAvailable: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
  color: {
    type: DataType.STRING,
    allowNull: false,
  },
  images: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
  description: {
    type: DataType.JSON,
    allowNull: false,
  },
  screen: {
    type: DataType.STRING,
    allowNull: true,
  },
  resolution: {
    type: DataType.STRING,
    allowNull: true,
  },
  processor: {
    type: DataType.STRING,
    allowNull: true,
  },
  ram: {
    type: DataType.STRING,
    allowNull: true,
  },
  zoom: {
    type: DataType.STRING,
    allowNull: true,
  },
  camera: {
    type: DataType.STRING,
    allowNull: true,
  },
  cell: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  createdAt: {
    type: DataType.DATE,
    defaultValue: sequelize.literal('NOW()'),
  },
}, {
  modelName: 'products',
  updatedAt: false,
});

Product.sync()
  .then(() => {
    console.log('Table synced with database');
  })
  .catch((error) => {
    console.error('Error syncing table:', error);
  });
