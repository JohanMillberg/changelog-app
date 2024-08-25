import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

// Product
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id',
    handleInputErrors,
    body('name').optional(),
    updateProduct
);
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
);
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    handleInputErrors,
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    updateUpdate)
router.post('/update',
    body('title').exists(),
    body('body').exists(),
    body('productId').exists(),
    handleInputErrors,
    createUpdate)
router.delete('/update/:id', deleteUpdate)

// Update point
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    () => { })
router.post('/updatepoint',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    () => { })
router.delete('/updatepoint/:id', () => { })

export default router;