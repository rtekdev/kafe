import { Stack } from "react-bootstrap";

const DiscountList = () => {
  return (
    <div className="discount__block">
      <Stack gap={3} className="discount__content">
        <p>Name</p>
        <div className="heading">
          <p>12% OFF</p>
          <span>Coded</span>
        </div>
      </Stack>
      <Stack className="discount__info">
        <h5>Code</h5>
        <Stack direction="horizontal">
          <p>End Date</p>
          <p>15 uses</p>
        </Stack>
      </Stack>
    </div>
  );
};

export default DiscountList;
