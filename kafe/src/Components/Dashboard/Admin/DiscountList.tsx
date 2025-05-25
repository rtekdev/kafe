import { Stack } from "react-bootstrap";

const classColorReturn = (num: number) => {
  if (num <= 5) return "green";
  else if (num <= 20) return "blue";
  else if (num <= 30) return "purple";
  else if (num <= 45) return "orange";
  else if (num > 45) return "red";
};

export type discountType = {
  _id: string;
  code: string;
  name: string;
  value: number;
  uses: number;
  global: boolean;
  date: {
    start: string;
    end: string;
  };
};

const DiscountList: React.FC<{ discounts: discountType[] }> = ({
  discounts,
}) => {
  return (
    <Stack style={{ alignItems: "end" }}>
      {discounts
        .sort((a, b) => a.value - b.value)
        .map((item) => (
          <div className="discount__block" key={item._id}>
            <Stack
              gap={3}
              className={`discount__content ${classColorReturn(item.value)}`}
            >
              <p>{item.name}</p>
              <div className="heading">
                <p>{item.value}% OFF</p>
                <span>{item.global ? "Global" : "Coded"}</span>
              </div>
            </Stack>
            <Stack className="discount__info">
              <h5>{item.code}</h5>
              <Stack direction="horizontal">
                <p>
                  {new Date(item.date.end)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")}
                </p>
                <p>{item.uses} uses</p>
              </Stack>
            </Stack>
          </div>
        ))}
    </Stack>
  );
};

export default DiscountList;
