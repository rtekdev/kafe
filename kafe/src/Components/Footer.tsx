import { Container, Stack } from 'react-bootstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';

const about_us_list = [
	{ id: 'l1', to: 'aboutus', text: 'O nas' },
	{ id: 'l2', to: 'coffee', text: 'Nasze kawy' },
	{ id: 'l3', to: 'info', text: 'Nasza Odpowiedzialność' },
	{ id: 'l4', to: 'stories', text: 'Kafe Stories' },
	{ id: 'l5', to: 'alergens', text: 'Alergeny i wartości odżywcze' },
];

const contact_with_us_list = [
	{ id: 'l1', to: 'career', text: 'Kariera' },
	{ id: 'l2', to: 'contact', text: 'Kontakt' },
];

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<Container>
				<Link to="/" className="brand_logo">
					<img src="/images/logo.png" alt="Kafe's Logo" />
				</Link>
				<Stack gap={3}>
					<p>O nas</p>
					<Stack gap={2}>
						{about_us_list.map((item) => (
							<Link className="color-light_grey" key={item.id} to={`/${item.to}`}>
								{item.text}
							</Link>
						))}
					</Stack>
				</Stack>
				<Stack gap={3}>
					<p>Skontaktuj się z nami</p>
					<Stack gap={2}>
						{contact_with_us_list.map((item) => (
							<Link className="color-light_grey" key={item.id} to={`/${item.to}`}>
								{item.text}
							</Link>
						))}
					</Stack>
				</Stack>
			</Container>
		</footer>
	);
};

export default Footer;
