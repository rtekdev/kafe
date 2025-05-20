import { useNavigate } from 'react-router-dom';
import './UI.scss';

export type DrinkCardProps = {
	id: string;
	name: string;
	image: string;
};

const DrinkCard: React.FC<DrinkCardProps> = ({ id, name, image }) => {
	const navigate = useNavigate();

	const handleOnRedirect = () => {
		return navigate('/shop/menu/drinks/' + id);
	};

	return (
		<div className="drink__card" onClick={handleOnRedirect}>
			<img src={`/images/menu/${image}`} alt={`Image of ${name}`} />
			<h4>{name}</h4>
		</div>
	);
};

export default DrinkCard;
