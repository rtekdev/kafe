import { NotFoundError } from '../util/errors.js';
import Product from '../Models/Product.js';

export const add = async (data) => {};

export const getAll = async () => {
	const products = await readProducts();
	if (products.length === 0) {
		throw new NotFoundError('Could not find any products');
	}

	return products;
};

export const get = async (id) => {
	try {
		return await Product.findOne({ _id: id })
	} catch (error) {
		console.error('Error while fetching product:', error);
		throw error;
	}
};

export const readProducts = async () => {
	try {
		return await Product.find({});
	} catch (error) {
		console.error('Error while fetching products:', error);
		throw error;
	}
};

export const addManyProducts = async (data) => {
  try {
		return await Product.insertMany(data)
	} catch (error) {
		console.error('Error while adding new Product:', error);
		return false;
	}
}

export const addProduct = async (data) => {
	const newProduct = new Product({
		name: data.name,
		details: {
			type: data.details.type,
			origin: data.details.origin,
			roastLevel: data.details.roastLevel,
			caffeineContent: data.details.caffeineContent,
			sizes: data.details.sizes,
		},
		extras: data.extras,
		image: data.image,
		description: data.description,
		promotion: [],
		created_by: data?.created_by ? data.created_by : null,
		availability: data.availability,
		reviews: [],
	});

	try {
		return await newProduct.save();
	} catch (error) {
		console.error('Error while adding new Product:', error);
		return false;
	}
};

export const clearProducts = async () => {
  try {
    await Product.deleteMany({})
  } catch(error) {
    console.error('Error while clearing Products:', error);
		return false;
  }
}