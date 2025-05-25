import { Stack } from "react-bootstrap";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Form } from "react-router-dom";
import "./Discount.scss";

const DiscountSearchBar = () => {
  return (
    <Stack direction="horizontal" className="discount__search">
      <h2>Discounts</h2>
      <Stack direction="horizontal" gap={3}>
        <Form className="dashboard__search users-search">
          <button type="button">
            <HiMagnifyingGlass />
          </button>
          <input placeholder="Search by name..." />
        </Form>
      </Stack>
    </Stack>
  );
};

export default DiscountSearchBar;
