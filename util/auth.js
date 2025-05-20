import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotAuthError } from './errors.js';

const KEY = 'supersecret';

export const createJSONToken = (username) => {
	try {
		return jwt.sign({ username }, KEY, { expiresIn: '1h' });
	} catch (error) {
		console.error('Błąd podczas generowania tokena:', error);
		return null;
	}
};

export const validateJSONToken = (token) => {
	return jwt.verify(token, KEY);
};

export const isValidPassword = async (enteredPassword, hashedPassword) => {
	return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const checkAuthMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	if (!req.headers.authorization) {
		console.log('NOT AUTH. AUTH HEADER MISSING.');
		return next(new NotAuthError('Not authenticated.'));
	}
	const authFragments = req.headers.authorization.split(' ');

	if (authFragments.length !== 2) {
		console.log('NOT AUTH. AUTH HEADER INVALID.');
		return next(new NotAuthError('Not authenticated.'));
	}
	const authToken = authFragments[1];
	try {
		const validatedToken = validateJSONToken(authToken);
		req.token = validatedToken;
	} catch (error) {
		console.log('NOT AUTH. TOKEN INVALID.');
		return next(new NotAuthError('Not authenticated.'));
	}
	next();
};
