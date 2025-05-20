import express from 'express';
import {
	isValidEmail,
	isValidText,
	isValidUsername,
} from '../util/validation.js';
import { add, getByEmail, getByUsername } from '../data/user.js';
import { createJSONToken, isValidPassword } from '../util/auth.js';

const router = express.Router();
router.post('/auth/signup', async (req, res, next) => {
	const data = req.body;
	let errors = {};

	!isValidEmail(data.email) && (errors.email = 'Invalid email.');
	!isValidUsername(data.username) && (errors.username = 'Invalid username.');

	if (Object.keys(errors).length === 0) {
		try {
			const results = await Promise.allSettled([
				getByUsername(data.username),
				getByEmail(data.email),
			]);

			const userByUsername =
				results[0].status === 'fulfilled' ? results[0].value : null;
			const userByEmail =
				results[1].status === 'fulfilled' ? results[1].value : null;

			if (userByUsername) {
				errors.username = 'Username exists already.';
			}
			if (userByEmail) {
				errors.email = 'Email already exists.';
			}
		} catch (error) {
			console.error('Nieoczekiwany błąd:', error);
		}
	}

	!isValidText(data.password, 4) &&
		(errors.passwoord =
			'Invalid password, Must be at least 4 characters long.');
	if (Object.keys(errors).length > 0) {
		return res.status(422).json({
			message: 'User signup failed due to validation errors.',
			errors,
		});
	}

	try {
		const createdUser = await add(data);
		const authToken = createJSONToken(createdUser.username);
		res
			.status(201)
			.json({ message: 'User created.', user: createdUser, token: authToken });
	} catch (error) {
		next(error);
	}
});

router.post('/auth/login', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	let user;
	try {
		user = await getByUsername(username);
	} catch (error) {
		return res.status(401).json({ message: 'Authentication failed.' });
	}

	const pwIsValid = await isValidPassword(password, user.password);
	if (!pwIsValid) {
		return res.status(422).json({
			message: 'Invalid credentials',
			errors: { credentials: 'Invalid username or password.' },
		});
	}

	const token = createJSONToken(username);
	res.json({ token, user });
});

export default router;
