/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import app from './src/server';
import 'dotenv/config';
import { OrderProducts } from './src/utils/db_order_product';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on  localhost:${process.env.PORT}`);
});
