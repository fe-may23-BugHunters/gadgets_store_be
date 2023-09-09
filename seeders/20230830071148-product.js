/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { products } = require('../src/data/products.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Products', products
      .map(({ id, ...product }) => ({
        ...product, description: JSON.stringify(product.description),
      })));
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
