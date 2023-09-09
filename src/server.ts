/* eslint-disable max-len */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as productsRouter } from './routes/products';
import { router as favouritesRouter } from './routes/favourites';

import { connect } from './utils/db';
connect();

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.use('/products', productsRouter);
app.use('/favourites', favouritesRouter);

export default app;
