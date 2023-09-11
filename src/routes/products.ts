import * as ProductController from '../controllers/products';
import express from 'express';

export const router = express.Router();

router.get('/', ProductController.getAll);
router.get('/search', ProductController.searchProducts);
router.get('/recommended', ProductController.getRandom10);
router.get('/variants', ProductController.getByVariant);
router.get('/new', ProductController.getRandom10);
router.get('/discount', ProductController.getHottest);
router.get('/:productId', ProductController.getById);
router.get('/:productId/recommended', ProductController.getRandom10);
