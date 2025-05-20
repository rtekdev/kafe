export class NotFoundError extends Error {
	constructor(message = 'Not Found') {
		super(message);
		this.name = 'NotFoundError';
		this.status = 404;
	}
}

export class NotAuthError extends Error {
	constructor(message = 'Not authorized') {
		super(message);
		this.name = 'NotAuthError';
		this.status = 401;
	}
}
