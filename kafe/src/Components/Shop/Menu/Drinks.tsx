import { Container, Stack } from 'react-bootstrap';
import HeroImage from '../../Home/HeroImage';
import { useAppSelector } from '../../../store';
import { Product } from '../../../store/product-redux';
import DrinkCard from '../../UI/DrinkCard';

const Drinks: React.FC = () => {
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
			<HeroImage page="Drinks" path="coffee_menu.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={2} className="hero__drinks info-block">
						<Stack className="menu_list" direction="vertical">
							{Object.values(groupedMap).map((category) => (
								<Stack key={category[0]._id} gap={2}>
									<h2 style={{ textTransform: 'capitalize' }}>
										{category[0].details.type}
									</h2>
									{category.map((item) => (
										<div className="card__list" key={item._id}>
											<DrinkCard
												id={item._id}
												name={item.name}
												image={item.image}
											/>
											<DrinkCard
												id={item._id}
												name={item.name}
												image={item.image}
											/>
											<DrinkCard
												id={item._id}
												name={item.name}
												image={item.image}
											/>
										</div>
									))}
								</Stack>
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

export default Drinks;
