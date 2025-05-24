import { Button, Stack } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
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
        <Button type="button" className="purple">
          <GoPlus />
          New Discount
        </Button>
      </Stack>
    </Stack>
  );
};

export default DiscountSearchBar;
