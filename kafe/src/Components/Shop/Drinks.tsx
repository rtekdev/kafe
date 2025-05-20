import { Card, Container, Stack } from 'react-bootstrap';
import HeroImage from '../Home/HeroImage';
import { Link } from 'react-router-dom';

const delivery_lists = [
	{
		id: 'nigga1',
		image: 'espresso.jpg',
		name: 'Espresso',
	},
	{
		id: 'nigga2',
		image: 'brewed.jpg',
		name: 'Kawy parzone',
	},
	{
		id: 'nigga3',
		image: 'espresso.jpg',
		name: 'Napoje na bazie espresso',
	},
	{
		id: 'nigga4',
		image: 'espresso.jpg',
		name: 'Napoje na bazie espresso',
	},
];

const Contact: React.FC = () => {
	return (
		<Stack className="hero">
			<HeroImage page="Napoje" path="menu_drinks.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={2}>
						<h3>ODKRYJ NASZE NAPOJE</h3>
						<p>
							Czy wiesz, że w naszych kawiarniach istnieje ponad 170 000
							sposobów personalizacji napojów? Nasi partnerzy (pracownicy)
							pomogą Ci stworzyć ten jeden jedyny, który będzie idealnie pasował
							do Twojego stylu życia. Od gorących i bogatych w smaku, po zimne i
							orzeźwiające – odkryj świat napojów Starbucks, które pokochasz od
							zaraz.
						</p>
					</Stack>
					<Stack gap={2} className="hero__menu info-block">
						<Stack className="menu_list" direction="horizontal">
							{delivery_lists.map((item) => (
								<Card key={item.id} style={{ width: '22rem' }} className="pb-3">
									<Card.Img variant="top" src={`/images/menu/${item.image}`} />
									<Card.Body>
										<Card.Title style={{ fontSize: '120%' }} className="pb-3">
											{item.name}
										</Card.Title>
										<Link
											to={`/shop/menu/drinks/${item.id}`}
											className="animated__button animated__button--green"
										>
											Zobacz więcej
										</Link>
									</Card.Body>
								</Card>
							))}
						</Stack>
					</Stack>
					<Stack gap={2}>
						<h3>Alergeny</h3>
						<p>
							Dokładamy wszelkich starań, aby w serwowanych produktach nie
							pojawiały się alergeny poza wymienionymi. W naszych kawiarniach
							używamy różnych składników, dlatego możliwe jest przedostanie się
							śladowych ilości substancji uczulających w zamawianych produktach
							ze względu na wykorzystanie tego samego sprzętu do ich
							przygotowania.
						</p>
						<button className="animated__button animated__button--green">
							Alergeny i wartości odżywcze
						</button>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Contact;
