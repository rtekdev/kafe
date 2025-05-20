import { Button, Container, Stack } from 'react-bootstrap';
import HeroImage from './HeroImage';

const Coffee: React.FC = () => {
	return (
		<Stack className="hero">
			<HeroImage page="Zamów Kafe" path="coffee_info.jpg" />
			<Container>
				<Stack gap={5} className="hero__content">
					<Stack gap={2}>
						<h3>Alergeny</h3>
						<p>
							Od 1971 roku najważniejsza dla nas była, jest i będzie jakość.
							Naszą pasją jest etyczne pozyskiwanie tylko najlepszych ziaren
							kawy Arabica i palenie ich z największa starannością. Naszej pasji
							do kawy dorównuje jedynie zamiłowanie do dzielenia się nią.
						</p>
						<p>
							Niezależnie od tego, czy popijasz ją samemu, czy przyjmując gości,
							delektowanie się kawą w domu powinno być relaksującym i kojącym
							doświadczeniem.
						</p>
						<p>
							Przy tak wielu opcjach wyboru, trudno znaleźć tę perfekcyjną
							filiżankę.
						</p>
					</Stack>
					<Stack gap={2}>
						<h3>Kafe w domu</h3>
						<p>
							Zabierz swoje ulubione napoje do domu, dzięki czemu zawsze
							będziesz cieszyć się idealną filiżanką kawy.
						</p>
						<button className="animated__button animated__button--green">
							Zamów dzięki Naszej usłudze dostaw
						</button>
					</Stack>
					<Stack gap={2}>
						<h3>Jak zaparzyć doskonałą kawę?</h3>
						<p>
							Możesz być zaskoczony, w jaki sposób rozmaite metody parzenia
							stosowane w Kafe mogą wzbogacić właściwości Twojej kawy. Dzielimy
							się z Tobą swoim wieloletnim doświadczenie, aby pomóc Ci odkryć
							jej prawdziwy potencjał - razem z nami za każdym razem
							przygotujesz idealną filiżankę kawy.
						</p>
					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};

export default Coffee;
