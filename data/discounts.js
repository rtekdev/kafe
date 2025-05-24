import Discount from "../Models/Discounts.js";

export const addDiscount = async ({ name, code, value, date }) => {
  const normalized = code.trim().toUpperCase();

  const discount = await Discount.createDiscount({
    name,
    code: normalized,
    value,
    date,
  });

  return discount;
};
