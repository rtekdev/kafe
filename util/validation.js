export const isValidUsername = (value) => {
	return value && value.trim().length > 3 && value.trim().length < 25;
};

export const isValidEmail = (value) => {
	return value && value.includes('@');
};

export const isValidText = (value, minLength = 1) => {
	return value && value.trim().length >= minLength;
};

export const isValidDate = (value) => {
	const date = new Date(value);
	return value && date !== 'Invalid Date';
};
