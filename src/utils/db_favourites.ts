/* eslint-disable max-len */
/* eslint-disable no-console */
import { sequelize } from './db';
import { DataType } from 'sequelize-typescript';
import { Product } from './db_product_table';

// USER MODEL CAN BE FOUND HERE https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure

export const Favourites = sequelize.define('Favourites', {
  userId: {
    type: DataType.STRING,
    allowNull: false,
  },
  productId: {
    type: DataType.UUID,
    references: {
      model: Product,
      key: 'id',
    },
  },
}, {
  modelName: 'favourites',
  updatedAt: false,
  createdAt: false,
});

Product.hasMany(Favourites, {
  foreignKey: 'productId', 'as': 'product',
});

Favourites.belongsTo(Product, {
  foreignKey: 'productId', 'as': 'product',
});

Favourites.removeAttribute('id');
// Favourites.removeAttribute('id');

Favourites.sync()
  .then(() => {
    console.log('Table synced with database');
  })
  .catch((error) => {
    console.error('Error syncing table:', error);
  });
