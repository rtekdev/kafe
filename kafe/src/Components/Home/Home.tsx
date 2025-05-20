import { Container, Stack } from 'react-bootstrap';
import './Hero.scss';
import HeroImage from './HeroImage';

const Home: React.FC = () => {
	return (
		<Stack className="hero">
			<HeroImage page="Strona główna" path="home_background.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={3} className="main">
						<h3>
							Wyśmienite, ręcznie przygotowane napoje i pyszne przekąski stworzone z prostych, najlepszej jakości
							składników.
						</h3>
						<h3>
							To, co nakręca nas do działania, to pasja do kawy i możliwość
							dostarczenia Ci odrobiny magii Starbucks, gdziekolwiek jesteś.
						</h3>
						<p>
							Niezależnie od tego, czy potrzebujesz kubka ulubionej kawy na
							dobry początek dnia, czy szybkiej przekąski, mamy coś dla każdego.
							Znajdź swoje małe co nieco i ze smakiem celebruj chwilę dla
							siebie.
						</p>
					</Stack>
					<Stack className="image_layout">
						<img src="/images/coffee_home.png" alt="Home Coffe Image" />
					</Stack>
					<Stack gap={2} className="addictives">
						<h3>Alergeny</h3>
						<p>
							Dokładamy wszelkich starań, aby w serwowanych produktach nie
							pojawiały się alergeny poza wymienionymi. W naszych kawiarniach
							używamy różnych składników, dlatego możliwe jest przedostanie się
							śladowych ilości substancji uczulających w zamawianych produktach
							ze względu na wykorzystanie tego samego sprzętu do ich
							przygotowania. 
						</p>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Home;
