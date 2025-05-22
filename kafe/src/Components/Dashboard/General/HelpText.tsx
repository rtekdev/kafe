import { Stack } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "./General.scss";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const help_tiles = [
  {
    name: "Getting Started",
    image: "start.jpg",
  },
  {
    name: "Security & Protection",
    image: "security.jpg",
  },
  {
    name: "Troubleshooting & Support",
    image: "support.jpg",
  },
];

const HelpText = () => {
  return (
    <Stack gap={2} className="help__text">
      <h2>Get the help you need</h2>
      <p>
        If you're feeling overwhelmed, remember you don't have to face it alone,
        <br />
        Reach out and get the help you need!
      </p>
      <Stack className="search" direction="horizontal" gap={2}>
        <input type="text" />
        <button>
          <CiSearch />
          Search
        </button>
      </Stack>
      <Stack direction="horizontal" gap={2} className="help__tiles">
        {help_tiles.map((item) => (
          <Stack key={item.name}>
            <img src={`/images/dashboard/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <hr />
            <Link to="">
              See details <FaArrowRightLong />
            </Link>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default HelpText;
