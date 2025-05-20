import { Card, Container, Stack } from 'react-bootstrap';
import HeroImage from '../../Home/HeroImage';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { Product } from '../../../store/product-redux';
import './Menu.scss'

const Menu: React.FC = () => {
	const products = useAppSelector((state) => state.products.products);

	const groupedMap: Record<string, Product[]> = Object.fromEntries(
		products.reduce((map, item) => {
			const type = item.details.type;
			if (!map.has(type)) {
				map.set(type, []);
			}
			map.get(type)!.push(item);
			return map;
		}, new Map<string, Product[]>())
	);

	return (
		<Stack className="hero">
			<HeroImage page="Menu" path="coffee_menu.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={2}>
						<h3>
							Wyśmienite, ręcznie przygotowane napoje i pyszne przekąski
							stworzone z prostych, najlepszej jakości składników.
						</h3>
						<h3>
							To, co nakręca nas do działania, to pasja do kawy i możliwość
							dostarczenia Ci odrobiny magii Kafe, gdziekolwiek jesteś.
						</h3>
						<p>
							Niezależnie od tego, czy potrzebujesz kubka ulubionej kawy na
							dobry początek dnia, czy szybkiej przekąski, mamy coś dla każdego.
							Znajdź swoje małe co nieco i ze smakiem celebruj chwilę dla
							siebie.
						</p>
					</Stack>
					<Stack gap={3} className="hero__menu info-block">
						<Stack className="menu_list" direction="horizontal">
							{Object.values(groupedMap).map((item) => (
								<Card key={item[0]._id}>
									<Card.Img
										variant="top"
										src={`/images/menu/${item[0].image}`}
									/>
									<Card.Body>
										<Card.Title style={{ fontSize: '2rem' }}>
											Odkryj Nasze {item[0].name}
										</Card.Title>
										<Card.Text>{item[0].description}</Card.Text>
										<Link
											to={`/shop/menu/drinks`}
											className="animated__button animated__button--green"
										>
											Sprawdź więcej
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

export default Menu;
