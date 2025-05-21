import { Container, ListGroup, Stack } from "react-bootstrap";
import HeroImage from "./HeroImage";

const authorInfo = [
  { id: "e1", heading: "Przedmiot", text: "Aplikacje Internetowe" },
  { id: "e2", heading: "Imię", text: "Bartosz" },
  { id: "e3", heading: "Numer", text: "29" },
];

const pageInfo = [
  { id: "e1", heading: "Nazwa", text: "Kafe" },
  { id: "e2", heading: "Frontend", text: "ReactJS, TypeScript, Redux" },
  { id: "e3", heading: "Backend", text: "Express, MongoDB, Mongoose" },
];

const Contact: React.FC = () => {
  return (
    <Stack className="hero">
      <HeroImage page="Kontakt" path="coffee_redirect_image.jpg" />
      <Container>
        <Stack gap={5} className="hero__content">
          <Stack gap={2}>
            <h3>Autor</h3>
            <ListGroup as="ol">
              {authorInfo.map((item) => (
                <ListGroup.Item key={item.id}>
                  <span className="color-grey">{item.heading}: </span>
                  <span>{item.text}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Stack>
          <Stack gap={2}>
            <h3>Strona</h3>
            <ListGroup as="ol">
              {pageInfo.map((item) => (
                <ListGroup.Item key={item.id}>
                  <span className="color-grey">{item.heading}: </span>
                  <span>{item.text}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Contact;
