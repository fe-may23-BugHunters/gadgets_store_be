/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as productsRouter } from './routes/products';
import { router as favouritesRouter } from './routes/favourites';
import { router as orderRouter } from './routes/orders';
import { router as orderProductsRouter } from './routes/orderProducts';

import { connect } from './utils/db';

connect();

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.use('/products', productsRouter);
app.use('/favourites', favouritesRouter);
app.use('/orders', orderRouter);
app.use('/order_products', orderProductsRouter);

export default app;
