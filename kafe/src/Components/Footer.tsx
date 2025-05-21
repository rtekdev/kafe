import { Container, Stack } from "react-bootstrap";
import "./Footer.scss";
import { Link } from "react-router-dom";

const about_us_list = [
  { id: "l1", to: "contact", text: "O nas" },
  { id: "l2", to: "menu", text: "Nasze kawy" },
  { id: "l3", to: "contact", text: "Nasza Odpowiedzialność" },
  { id: "l4", to: "contact", text: "Kafe Stories" },
  { id: "l5", to: "menu", text: "Alergeny i wartości odżywcze" },
];

const contact_with_us_list = [
  { id: "l1", to: "contact", text: "Kariera" },
  { id: "l2", to: "contact", text: "Kontakt" },
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
              <Link
                className="color-light_grey"
                key={item.id}
                to={`/shop/${item.to}`}
              >
                {item.text}
              </Link>
            ))}
          </Stack>
        </Stack>
        <Stack gap={3}>
          <p>Skontaktuj się z nami</p>
          <Stack gap={2}>
            {contact_with_us_list.map((item) => (
              <Link
                className="color-light_grey"
                key={item.id}
                to={`/shop/${item.to}`}
              >
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
