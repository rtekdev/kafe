import { Stack } from "react-bootstrap";
import DiscountSearchBar from "../../../Components/Dashboard/Admin/DiscountSearchBar";
import DiscountList from "../../../Components/Dashboard/Admin/DiscountList";

const Discounts: React.FC = () => {
  return (
    <Stack gap={4}>
      <DiscountSearchBar />
      <Stack direction="horizontal">
        {/* form */}
        <DiscountList />
      </Stack>
    </Stack>
  );
};

export default Discounts;
