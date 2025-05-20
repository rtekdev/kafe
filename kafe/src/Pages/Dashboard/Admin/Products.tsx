import { Stack } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ProductsSearch from '../../../Components/Dashboard/Admin/ProductsSearch';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import ProductsList from '../../../Components/Dashboard/Admin/ProductList';
import ProductsListBar from '../../../Components/Dashboard/Admin/ProductsListBar';

const ProductsPage: React.FC = () => {
	const activeUser = useAppSelector((state) => state.user.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (activeUser?.role === 1 || activeUser?.role === 2)
			navigate('/dashboard/home');
	}, [activeUser]);

	// Search
	const [searchedText, setSearchedText] = useState<string>('');

	const handleOnChangeSearchedText = (newText: string) => {
		setSearchedText((prev) => newText);
	};

	// Products
	const products = useLoaderData() as Awaited<ReturnType<typeof loadProducts>>;

	// ListIndex
	const [listIndex, setListIndex] = useState<number>(1);
	const [numOfIndexses, setNumOfIndexses] = useState<number>(0);
	const [numOfProducts, setNumOfProducts] = useState<number>(products.length);

	const handleOnChangeListIndex = (newIndex: number) => {
		setListIndex((prev) => newIndex);
	};

	const handleOnSetNumOfIndexses = (indexses: number) => {
		setNumOfIndexses((prev) => indexses);
	};

	const handleOnSetNumOfProducts = (newNum: number) => {
		setNumOfProducts((prev) => newNum);
	};

	return (
		<Stack direction="vertical" gap={5}>
			<ProductsSearch onTextChanged={handleOnChangeSearchedText} />
			<ProductsList
				products={products}
				currentIndex={listIndex}
				onSetIndexses={handleOnSetNumOfIndexses}
				onSetNumOfProducts={handleOnSetNumOfProducts}
			/>
			<ProductsListBar
				numOfIndexses={numOfIndexses}
				onChangeListIndex={handleOnChangeListIndex}
				numOfProducts={numOfProducts}
			/>
		</Stack>
	);
};

export default ProductsPage;

export const loadProducts = async () => {
	const response = await fetch('http://localhost:5000/api/products');

	if (!response.ok)
		throw new Response('Could not fetch products.', { status: 500 });

	const resData = await response.json();
	return resData.products;
};

export const loader = () => loadProducts();
