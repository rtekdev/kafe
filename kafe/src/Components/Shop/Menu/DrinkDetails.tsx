import { useRouteLoaderData } from 'react-router-dom';
import { Product, SizeOption } from '../../../store/product-redux';
import { useAppSelector } from '../../../store';
import { useEffect, useState } from 'react';
import { User, userActions } from '../../../store/user-redux';
import { useDispatch } from 'react-redux';

type Props = {
	product: Product;
};

const DrinkDetails: React.FC<Props> = ({ product }) => {
	const token = useRouteLoaderData('root');
	const userRedux = useAppSelector((state) => state.user.user);
	const dispatch = useDispatch();

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (token) {
			setUser(userRedux);
		}
	}, [token, userRedux]);

	const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>(
		product.details.sizes[0].size
	);

	const handleOnAddProduct = async () => {
		if (user) {
			const response = await fetch(
				'http://localhost:5000/api/users/add_to_cart',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: user._id,
						product_id: product._id,
						product_size: selectedSize,
					}),
				}
			);

			if (!response.ok)
				throw new Response('Error while inserting product.', {
					status: 500,
				});

			const selectedProduct = product.details.sizes.find(
				(item) => item.size === selectedSize
			);
			if (selectedProduct && response.ok) {
				dispatch(
					userActions.addToCart({
						size: selectedSize,
						price: selectedProduct.price,
						originalProduct: product,
					})
				);
			}

			const resData = await response.json();
		}
	};

	const handleOnRemoveProduct = async () => {
		if (user) {
			const response = await fetch(
				'http://localhost:5000/api/users/remove_from_cart',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: user._id,
						product_id: product._id,
						product_size: selectedSize,
					}),
				}
			);

			if (!response.ok)
				throw new Response('Error while removing product.', {
					status: 500,
				});

			const selectedProduct = product.details.sizes.find(
				(item) => item.size === selectedSize
			);
			if (selectedProduct && response.ok) {
				dispatch(
					userActions.removeFromCart({
						size: selectedSize,
						price: selectedProduct.price,
						originalProduct: product,
					})
				);
			}
			const resData = await response.json();
		}
	};

	return (
		<section className="container menu__drink">
			<img src={`/images/menu/${product.image}`} />
			{token && user && (
				<>
					<button onClick={handleOnAddProduct}>Dodaj do koszyka</button>
					<button onClick={handleOnRemoveProduct}>Usuń z koszyka</button>
				</>
			)}
		</section>
	);
};

export default DrinkDetails;
