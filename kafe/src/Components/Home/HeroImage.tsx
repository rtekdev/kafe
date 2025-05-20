import { Button, Stack } from 'react-bootstrap';
import './HeroImage.scss';
import { Link, useRouteLoaderData } from 'react-router-dom';

export interface heroImageProps {
	page: string;
	path: string;
}

const HeroImage: React.FC<heroImageProps> = ({ page, path }) => {
	const token = useRouteLoaderData('root');

	return (
		<div className="hero__image">
			<img src={`/images/${path}`} alt="Main Home Background Photo" />
			<Stack gap={4} className="hero__cta">
				<h2>{page}</h2>
				<Link to={token ? '/dashboard' : '/auth?mode=login'}>Twoje konto</Link>
				<Link to="/shop/menu">Sprawdź Naszą Ofertę</Link>
			</Stack>
		</div>
	);
};

export default HeroImage;
