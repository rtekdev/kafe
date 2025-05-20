import { createSlice } from '@reduxjs/toolkit';

export type SizeOption = {
	size: 'S' | 'M' | 'L';
	price: number;
};

export type Review = {
	user: null;
	rating: number;
	comment: string;
	date: Date;
};

export type Product = {
	_id: string;
	name: string;
	details: {
		type: 'espresso' | 'americano' | 'cappuccino' | 'brewed' | 'cold brew';
		origin: string;
		roastLevel: 'light' | 'medium' | 'dark';
		caffeineContent: number;
		sizes: SizeOption[];
	};
	extras: ('vanilla' | 'caramel' | 'whipped cream' | 'chocolate drizzle')[];
	image: string;
	description: string;
	promotion: {
		is: boolean;
		value: number;
		date: {
			start: Date;
			end: Date;
		};
	};
	created_by: null;
	availability: boolean;
	reviews: Review[];
};

export type ProductBySize = {
	size: SizeOption['size'];
	price: number;
	originalProduct: Omit<Product, 'details'> & {
		details: Omit<Product['details'], 'sizes'>;
	};
};

export const transformProductsBySize = (
	products: Product[]
): ProductBySize[] => {
	return products.flatMap((product) =>
		product.details.sizes.map((size) => ({
			size: size.size,
			price: size.price,
			originalProduct: {
				...product,
				details: {
					...product.details,
					sizes: undefined,
				},
			},
		}))
	);
};

export type initialProducts = {
	products: Product[];
};

const initialState: initialProducts = {
	products: [],
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: { payload: Product[] }) => {
			state.products = action.payload;
		},
	},
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
