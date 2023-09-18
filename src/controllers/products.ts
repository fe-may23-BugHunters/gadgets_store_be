/* eslint-disable no-shadow */
import * as ProductsService from '../services/products';
import { Request, Response } from 'express';
import { SortField } from '../types/SortField';
import { Category } from '../types/Category';

const sortFields = ['name', 'priceRegular', 'capacity'];

export async function getAll(
  req: Request,
  res: Response,
) {
  try {
    const limit = req.query.limit && !isNaN(+req.query.limit)
      ? +req.query.limit
      : 10;
    const offset = req.query.offset && !isNaN(+req.query.offset)
      ? +req.query.offset
      : 0;
    const sortBy = sortFields.includes(req.query.sortBy as SortField)
      ? req.query.sortBy
      : 'name';
    const category = Object.keys(Category)
      .includes(req.query.category as Category)
      ? req.query.category as Category
      : 'phones';

    const result = await ProductsService.getAllFromCategory(
      limit,
      offset,
      sortBy as SortField,
      category as Category,
    );

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server error' });
  }
}

export async function getById(
  req: Request,
  res: Response,
) {
  try {
    const result = await ProductsService.getById(req.params.productId);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getRandom10(
  req: Request,
  res: Response,
) {
  try {
    const limit = 10;

    const min = 1;
    const max = (await ProductsService.getAll(1, 1)).count - limit;

    const offset = Math.floor(Math.random() * (max - min)) + min;

    const result = await ProductsService.getRandom(limit, offset);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getByVariant(
  req: Request,
  res: Response,
) {
  try {
    const color = req.query.color;
    const capacity = req.query.capacity;
    const namespaceId = req.query.namespaceId;

    const result = await ProductsService.getVariant(
      color as string,
      capacity as string,
      namespaceId as string,
    );

    if (!result) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function searchProducts(
  req: Request,
  res: Response,
) {
  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ error: "'Query' is required" });
  }

  const limit = req.query.limit && !isNaN(+req.query.limit)
    ? +req.query.limit
    : 10;
  const offset = req.query.offset && !isNaN(+req.query.offset)
    ? +req.query.offset
    : 0;

  try {
    const results = await ProductsService.searchProductsByQuery(
      query,
      limit,
      offset,
    );

    if (results.rows.length === 0) {
      return res.status(204).end();
    } else {
      return res.status(200).json(results);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
