import { Stack } from 'react-bootstrap';
import { CartItem } from '../../store/user-redux';
import './CartRecord.scss';

const CartRecord: React.FC<{ cart_product: CartItem }> = ({ cart_product }) => {
	console.log(Math.floor(Math.random() * 2 + 1));
	return (
		<Stack direction="horizontal" className="cart-item" gap={4}>
			<img src={`/images/menu/${cart_product.originalProduct.image}`} />
			<Stack direction="vertical">
				<p>{cart_product.originalProduct.name}</p>
				<div className="special-blocks">
					<p>{cart_product.size}</p>
					<p>
						{
							cart_product.originalProduct.extras[
								Math.floor(Math.floor(Math.random() * 2))
							]
						}
					</p>
				</div>
			</Stack>
		</Stack>
	);
};

export default CartRecord;
