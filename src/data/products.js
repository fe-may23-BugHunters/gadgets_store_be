/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
// USE ONLY FOR SEEDING

const { accessories } = require('./accessories');
const { phones } = require('./phones');
const { tablets } = require('./tablets');

const products = [...phones, ...tablets, ...accessories];

module.exports = { products };
