import { Stack } from "react-bootstrap";
import DiscountSearchBar from "../../../Components/Dashboard/Admin/DiscountSearchBar";
import DiscountList from "../../../Components/Dashboard/Admin/DiscountList";
import DiscountForm from "../../../Components/Dashboard/Admin/DiscountForm";
import { useAppSelector } from "../../../store";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Discounts: React.FC = () => {
  const activeUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser?.role === 1 || activeUser?.role === 2)
      navigate("/dashboard/home");
  }, [activeUser]);

  const discounts = useLoaderData() as Awaited<
    ReturnType<typeof loadDiscounts>
  >;

  return (
    <Stack gap={5}>
      <DiscountSearchBar />
      <Stack
        direction="horizontal"
        style={{ justifyContent: "space-between", alignItems: "start" }}
      >
        <DiscountForm />
        <DiscountList discounts={discounts} />
      </Stack>
    </Stack>
  );
};

export default Discounts;

export const loadDiscounts = async () => {
  const response = await fetch("http://localhost:5000/api/discount");

  if (!response.ok)
    throw new Response("Could not fetch any discounts.", { status: 500 });

  const resData = await response.json();
  return resData;
};

export const loader = () => loadDiscounts();
