import { Card, Container, Stack } from 'react-bootstrap';
import HeroImage from './HeroImage';

const delivery_lists = [
	{
		id: 'd1',
		image: 'uber_eats.png',
		name: 'Uber Eats',
		vouchers: [],
	},
	{ id: 'd2', image: 'glovo.png', name: 'Glovo', vouchers: [] },
	{ id: 'd3', image: 'pyszne_pl.png', name: 'Pszyne.pl', vouchers: [] },
	{ id: 'd4', image: 'wolt.webp', name: 'Wolt', vouchers: [] },
];

const Delivers: React.FC = () => {
	return (
		<Stack className="hero">
			<HeroImage page="Nasza Kawa" path="coffee_background.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={2}>
						<h3>Twój ulubiony Kafe® teraz jeszcze bliżej Ciebie!</h3>
						<p>
							Dowiedz się, czy dostawa jest dostępna w Twojej okolicy.
							Rozpocznij zamówienie, aby otrzymać ulubione produkty Kafe® za
							pośrednictwem aplikacji lub strony internetowej wybranego
							partnera.
						</p>
					</Stack>
					<Stack gap={2} className="hero__delivers info-block">
						<h3>Nasi partnerzy</h3>
						<Stack className="delivery_list" direction="horizontal">
							{delivery_lists.map((item) => (
								<Card key={item.id} style={{ width: '22rem' }}>
									<Card.Img variant="top" src={`/images/${item.image}`} />
									<Card.Body>
										<Card.Title>
											Usługa Kafe Delivers® dostępna w {item.name}
										</Card.Title>
										<Card.Text>
											Zamów swoje ulubione produkty przez {item.name}
										</Card.Text>
										<hr />
										<Card.Link href='' className="color-green">Zamów teraz</Card.Link>
										<button className="animated__button animated__button--green">
											Sprawdź aktywne kupony
										</button>
									</Card.Body>
								</Card>
							))}
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Delivers;
