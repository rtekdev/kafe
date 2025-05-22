import { useEffect, useState } from "react";
import { Stack, Table } from "react-bootstrap";
import { useAppSelector } from "../../../store";

const today = new Date();

function getLastNDates(n: number) {
  const dates = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
}

function formatYMD(date: Date) {
  return date.toISOString().slice(0, 10);
}

const [yesterday, twoDaysAgo, threeDaysAgo] = getLastNDates(3);

export type orders_type = {
  customer: string;
  product: string;
  quantity: number;
  date: string;
  status: string;
};

const orders_list: orders_type[] = [
  {
    customer: "rtek",
    product: "Coffee",
    quantity: 7,
    date: formatYMD(new Date()),
    status: "In queue",
  },
  {
    customer: "rtek",
    product: "Cookie",
    quantity: 6,
    date: formatYMD(yesterday),
    status: "Confirmed",
  },
  {
    customer: "rtek",
    product: "Coffee",
    quantity: 10,
    date: formatYMD(twoDaysAgo),
    status: "Cancelled",
  },
  {
    customer: "XYZ",
    product: "Coffee",
    quantity: 4,
    date: formatYMD(yesterday),
    status: "Confirmed",
  },
  {
    customer: "ZYX",
    product: "Cookie",
    quantity: 5,
    date: formatYMD(threeDaysAgo),
    status: "Cancelled",
  },
  {
    customer: "YZX",
    product: "Cookie",
    quantity: 2,
    date: formatYMD(twoDaysAgo),
    status: "Confirmed",
  },
];

const statusColorReturn = (status: string) => {
  if (status === "Confirmed") {
    return "green";
  } else if (status === "In queue") return "yellow";
  else if (status === "Cancelled") return "red";

  return "";
};

const OrderList: React.FC = () => {
  const [filteredOrders, setFilteredOrders] = useState<orders_type[] | []>([]);
  const userRedux = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (userRedux) {
      if (userRedux.role === 0) {
        setFilteredOrders(orders_list);
      } else {
        const filter = orders_list.filter(
          (item) => item.customer === userRedux.username
        );
        setFilteredOrders(filter);
      }
    }
  }, [userRedux]);

  return (
    <Stack gap={2} className="orders__list">
      <h2>Orders</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders_list.map((item, index) => (
            <tr key={index}>
              <td>#{10000 + index}</td>
              <td>{item.customer}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>${(item.quantity * 17.99).toFixed(2)}</td>
              <td>{item.date}</td>
              <td>
                <p className={`custom-block ${statusColorReturn(item.status)}`}>
                  {item.status}
                </p>
              </td>
              <td>
                <p className="custom-block controls">View Details</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default OrderList;
