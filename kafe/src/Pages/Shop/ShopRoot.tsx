import { Outlet } from 'react-router-dom';
import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer';

const ShopRoot = () => {
	return (
		<>
			<Navigation />
			<main className='bgc--sand'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default ShopRoot;
