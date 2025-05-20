import { useLoaderData } from 'react-router-dom';
import Menu from '../../../Components/Shop/Menu/Menu';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store';
import { productActions } from '../../../store/product-redux';

const MenuPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const products = useLoaderData() as Awaited<ReturnType<typeof loadProducts>>;

	useEffect(() => {
		dispatch(productActions.setProducts(products));
	}, [dispatch, products]);

	return <Menu />;
};

export default MenuPage;

export const loadProducts = async () => {
	const response = await fetch('http://localhost:5000/api/products');

	if (!response.ok)
		throw new Response('Could not fetch products.', { status: 500 });

	const resData = await response.json();
	return resData.products;
};

export const loader = () => loadProducts();
