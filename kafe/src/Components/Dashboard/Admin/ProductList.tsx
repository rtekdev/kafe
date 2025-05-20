import { Stack, Table } from 'react-bootstrap';
import { Product, ProductBySize, SizeOption, transformProductsBySize } from '../../../store/product-redux';
import { useEffect, useState } from 'react';
import { FaSquareCheck, FaRectangleXmark } from 'react-icons/fa6';
import { CiRead } from 'react-icons/ci';
import { MdOutlineModeEditOutline } from 'react-icons/md';

const sliceProductList = (
	products: ProductBySize[],
	chunkSize: number
): ProductBySize[][] =>
	Array.from({ length: Math.ceil(products.length / chunkSize) }, (_, i) =>
		products.slice(i * chunkSize, i * chunkSize + chunkSize)
	);

const getProductList = (
	products: ProductBySize[],
	index: number,
	chunkSize: number
): ProductBySize[] => sliceProductList(products, chunkSize)[index - 1] ?? [];

const ProductsList: React.FC<{
	products: Product[];
	currentIndex: number;
	onSetIndexses: (numOfIndexses: number) => void;
    onSetNumOfProducts: (numOfProducts: number) => void
}> = ({ products, currentIndex, onSetIndexses, onSetNumOfProducts }) => {
	const [productList, setProductList] = useState(
		transformProductsBySize(products)
	);

	useEffect(() => {
		const numOfIndexses: number = sliceProductList(productList, 5).length;
        const numOfProducts: number = productList.length
		onSetIndexses(numOfIndexses);
        onSetNumOfProducts(numOfProducts)
	}, []);

	useEffect(() => {
		setProductList((prev) => transformProductsBySize(products));
	}, [currentIndex]);

	return (
		<Table responsive className="products__list">
			<thead>
				<tr>
					<th>Products</th>
					<th>Status</th>
					<th>Price</th>
					<th>Customers</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{getProductList(productList, currentIndex, 5).map((product) => (
					<tr key={product.originalProduct._id + '_' + product.size}>
						<td>
							<Stack direction="horizontal" gap={4}>
								<img
									src={`/images/menu/${product.originalProduct.image}`}
									alt={product.originalProduct.name}
								/>
								<Stack className="product-name">
									<p>
										{product.originalProduct.name} {product.size}
									</p>
									<p className="extras">
										Extras: {product.originalProduct.extras.join(' · ')}
									</p>
								</Stack>
							</Stack>
						</td>
						<td>
							<p
								className={
									product.originalProduct.availability
										? 'available custom-block'
										: 'unavailable custom-block'
								}
							>
								{product.originalProduct.availability ? (
									<FaSquareCheck />
								) : (
									<FaRectangleXmark />
								)}
								{product.originalProduct.availability
									? 'Available'
									: 'Unavailable'}
							</p>
						</td>
						<td>
							<p>${product.price}</p>
						</td>
						<td>
							<p>{Math.floor(Math.random() * 1000)}</p>
						</td>
						<td>
							<p>
								<button className="users__list-button">
									<CiRead />
								</button>
								<button className="users__list-button">
									<MdOutlineModeEditOutline />
								</button>
							</p>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default ProductsList;
