import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { CartItem, userActions } from '../../store/user-redux';
import Modal from '../UI/Modal';
import { currencyFormatter } from '../../util/formatting';
import { Stack } from 'react-bootstrap';
import { ProductBySize } from '../../store/product-redux';
import CartRecord from './CartRecord';
import { IoArrowBack } from 'react-icons/io5';

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const user = useAppSelector((state) => state.user);
	if (user.user === null) return null;

	const userCart: CartItem[] = user.user.cart;
	console.log(userCart);

	const cartTotal = userCart.reduce((totalPrice, item) => {
		if (!item || typeof item.price !== 'number') return totalPrice;
		return totalPrice + item.count * item.price;
	}, 0);

	const handleOnCloseCart = () => {
		dispatch(userActions.hideCart());
	};

	return (
		<Modal
			className="cart"
			open={user.progress === 'cart'}
			onClose={user.progress === 'cart' ? handleOnCloseCart : () => {}}
		>
			<Stack direction="horizontal" gap={3} className="cart-header">
				<button onClick={handleOnCloseCart}>
					<IoArrowBack />
				</button>
				<h2>Your Cart</h2>
			</Stack>
			<Stack direction="vertical" gap={4} className='cart-records'>
				{userCart &&
					userCart.map((item) => (
						<CartRecord key={item.originalProduct._id} cart_product={item} />
					))}
			</Stack>
			<Stack className="cart-control" direction="horizontal" gap={3}>
				<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
				<button onClick={handleOnCloseCart}>Go to Checkout</button>
			</Stack>
		</Modal>
	);
};

export default Cart;
