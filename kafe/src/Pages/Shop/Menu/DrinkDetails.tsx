import { Await, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import DrinkDetails from '../../../Components/Shop/Menu/DrinkDetails';
import { Suspense } from 'react';

const DrinkDetailsPage: React.FC = () => {
	const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={product.product}>
				<DrinkDetails product={product.product} />
			</Await>
		</Suspense>
	);
};

export default DrinkDetailsPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id;

	if (!id) {
		throw new Response('Not Found ID', { status: 400 });
	}

	const response = await fetch('http://localhost:5000/api/products/' + id);
	if (!response.ok) {
		throw new Response('Product not found', { status: 404 });
	}

	const data = await response.json();
	return data;
};
