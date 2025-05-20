import express from 'express';
import { getById, getByUsername, readUsers } from '../data/user.js';
import { NotFoundError } from '../util/errors.js';
import { checkAuthMiddleware as checkAuth } from '../util/auth.js';

const router = express.Router();

router.post('/get_by_username', async (req, res) => {
	const username = req.body.username;

	try {
		const user = await getByUsername(username);
		if (user) res.json(user);
	} catch (err) {
		throw new NotFoundError("Can't found user by sent username, ", err);
	}
});

router.get('/get_all', async (req, res) => {
	try {
		const users = await readUsers();
		res.json(users);
	} catch (err) {
		throw new NotFoundError("Can't find any users", err);
	}
});

router.post('/add_to_cart', async (req, res) => {
	const userID = req.body.user_id;
	const productID = req.body.product_id;
	const productSize = req.body.product_size;

	try {
		const user = await getById(userID);
		await user.addToCart(productID, productSize);
		res.status(200).json({ message: 'Added to Cart' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.post('/remove_from_cart', async (req, res) => {
	const userID = req.body.user_id;
	const productID = req.body.product_id;
	const productSize = req.body.product_size;

	try {
		const user = await getById(userID);
		await user.removeFromCart(productID, productSize);
		res.status(200).json({ message: 'Removed from cart' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.use(checkAuth);

export default router;
