import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductBySize, SizeOption } from './product-redux';

export type CartItem = ProductBySize & {
	count: number;
	_id: string;
};

export type User = {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: 0 | 1 | 2 | 3;
	cart: CartItem[];
};

export type UserState = {
	user: User | null;
	progress: string;
};

const initialState: UserState = {
	user: null,
	progress: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: { payload: User }) => {
			state.user = action.payload;
		},
		clearUser(state) {
			state.user = null;
		},
		openCart(state) {
			state.progress = 'cart';
		},
		hideCart(state) {
			state.progress = '';
		},
		showCheckout(state) {
			state.progress = 'checkout';
		},
		hideCheckout(state) {
			state.progress = '';
		},
		addToCart: (state, action: { payload: ProductBySize }) => {
			if (state.user) {
				const existingItem = state.user.cart.find(
					(item) =>
						item.originalProduct._id === action.payload.originalProduct._id &&
						item.size === action.payload.size
				);

				if (existingItem) {
					existingItem.count += 1;
				} else {
					state.user.cart.push({
						...action.payload,
						count: 1,
						_id: (Math.random() * 1000).toString(),
					});
				}
			}
		},
		removeFromCart: (state, action: { payload: ProductBySize }) => {
			if (state.user) {
				const existingItem = state.user.cart.find(
					(item) =>
						item.originalProduct._id === action.payload.originalProduct._id &&
						item.size === action.payload.size
				);

				if (existingItem) {
					if (existingItem.count === 1) {
						state.user.cart = state.user.cart.filter(
							(item) =>
								!(
									item.originalProduct._id ===
										action.payload.originalProduct._id &&
									item.size === action.payload.size
								)
						);
					} else {
						existingItem.count -= 1;
					}
				}
			}
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
