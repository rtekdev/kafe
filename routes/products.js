import express from 'express';
import { getAll, get, addProduct, clearProducts } from '../data/products.js';
import { checkAuthMiddleware as checkAuth } from '../util/auth.js';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/reset', async (req, res, next) => {
	
	try {
		await clearProducts()
		const core_products = JSON.parse(fs.readFileSync(path.join(__dirname, '../products.json'), 'utf-8'));
		
		for(const product of core_products) {
			await addProduct(product)
		}
		
		const products = await getAll();
		res.json({ products });
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const products = await getAll();
		res.json({ products });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const product = await get(req.params.id);
		res.json({ product });
	} catch (error) {
		next(error);
	}
});

router.use(checkAuth);

export default router;
