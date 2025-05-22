import { Stack } from "react-bootstrap";
import "./User.scss";
import { FaTag } from "react-icons/fa6";

const numOfProducts = Math.floor(Math.random() * 20) + 10;

const orders_tiles = [
  {
    name: "Total order",
    num: numOfProducts,
    color: "green",
  },
  {
    name: "Delivered",
    num: Math.floor(numOfProducts * 0.7) + 1,
    color: "blue",
  },
  {
    name: "In queue",
    num: Math.floor(numOfProducts * 0.3),
    color: "yellow",
  },
  {
    name: "Cancelled",
    num: Math.floor(numOfProducts * 0.1),
    color: "red",
  },
];

const OrdersShortcut = () => {
  return (
    <Stack direction="horizontal" className="orders__shortcut" gap={3}>
      <div className="date">
        <h3>{new Date().getDate()}</h3>
        <div>
          <p>
            {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
              new Date()
            )}
          </p>
          <p>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>
      </div>
      {orders_tiles.map((item) => (
        <div key={item.name} className={`orders__tile ${item.color}`}>
          <p className="color">{item.name}</p>
          <p className="fwb">{item.num}</p>
          <div>
            <hr />
            <p>
              <FaTag />
              <span className="color">${(item.num * 17.99).toFixed(2)}</span>
            </p>
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default OrdersShortcut;
