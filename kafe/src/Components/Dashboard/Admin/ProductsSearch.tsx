import { Button, Stack } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa6';
import { LuLibrary } from 'react-icons/lu';
import { GoPlus } from 'react-icons/go';
import { CiStar } from 'react-icons/ci';
import './Products.scss';
import { Form } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { ChangeEvent } from 'react';

const ProductsSearch: React.FC<{ onTextChanged: (text: string) => void }> = ({
	onTextChanged,
}) => {
	const handleOnChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		onTextChanged(e.target.value);
	};

	return (
		<Stack direction="vertical" className="products">
			<Stack direction="horizontal">
				<Stack direction="vertical" className="products__hero">
					<h1>Products</h1>
					<Stack direction="horizontal" gap={4}>
						<p>
							<FaRegComment />
							Manage Comments
						</p>
						<p>
							<LuLibrary />
							Library Sorting
						</p>
					</Stack>
				</Stack>
				<Stack direction="horizontal" gap={4} className="products__buttons">
					<Button type="button">
						<CiStar />
						Leave Feedback
					</Button>
					<Button type="button" className="purple">
						<GoPlus />
						New Product
					</Button>
				</Stack>
			</Stack>
			<Stack direction="horizontal" className="products__search-area">
				<Form className="dashboard__search products-search">
					<button type="button">
						<HiMagnifyingGlass />
					</button>
					<input placeholder="Search" onChange={handleOnChangeText} />
				</Form>
				<select className="dashboard__search products-search" defaultValue="">
					<option value="" disabled hidden>
						Status
					</option>
					<option value={0}>All Products</option>
					<option value={1}>Published</option>
					<option value={2}>Unpublished</option>
				</select>
			</Stack>
		</Stack>
	);
};

export default ProductsSearch;
