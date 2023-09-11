import { Product } from '../utils/db_product_table';
import { SortField } from '../types/SortField';
import { Category } from '../types/Category';
import Sequelize from 'sequelize';

export async function getAllFromCategory(
  limit: number,
  offset: number,
  sortBy: SortField,
  category: Category,
  reverse: boolean,
) {
  const order = reverse ? 'ASC' : 'DESC';

  return Product.findAndCountAll({
    where: {
      category,
    },
    order: [
      [ sortBy, order ],
    ],
    limit,
    offset,
  });
}

export async function getAll(limit: number, offset: number) {
  return Product.findAndCountAll({
    order: [
      'name',
    ],
    limit,
    offset,
  });
}

export async function getById(id: string) {
  return Product.findByPk(id);
}

export async function getRandom(limit: number, offset: number) {
  return Product.findAll({
    order: [
      'createdAt',
    ],
    limit,
    offset,
  });
}

export async function getHottest(limit: number, offset: number) {
  return Product.findAll({
    order: [
      [ 'priceDiscount', 'DESC' ],
    ],
    limit,
    offset,
  });
}

export async function getVariant(
  color: string,
  capacity: string,
  namespaceId: string,
) {
  return Product.findAll({
    where: {
      color,
      capacity,
      namespaceId,
    },
    order: [
      'createdAt',
    ],
  });
}

export async function searchProductsByQuery(
  query: string,
  limit: number,
  offset: number,
  sortBy: SortField,
  category: Category,
  reverse: boolean,
) {
  const order = reverse ? 'ASC' : 'DESC';

  return Product.findAndCountAll({
    where: {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.iLike]: `%${query}%` } },
        Sequelize.where(Sequelize.cast(Sequelize.col('description'), 'text'), { [Sequelize.Op.iLike]: `%${query}%` }),
      ],
      category,
    },
    order: [
      [ sortBy, order ],
    ],
    limit,
    offset,
  });
}
