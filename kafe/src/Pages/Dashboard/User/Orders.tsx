import { Stack } from "react-bootstrap";
import OrdersShortcut from "../../../Components/Dashboard/User/OrdersShortcut";
import OrderList from "../../../Components/Dashboard/User/OrderList";

const OrdersDashboard: React.FC = () => {
  return (
    <Stack gap={5}>
      <OrdersShortcut />
      <OrderList />
    </Stack>
  );
};

export default OrdersDashboard;
