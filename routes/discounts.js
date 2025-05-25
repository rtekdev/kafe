import express from "express";
import Discount from "../Models/Discounts.js";
import { addDiscount } from "../data/discounts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const discounts = await Discount.find({});
    res.json(discounts);
  } catch (err) {
    next(err);
  }
});

router.get("/active", async (req, res, next) => {
  try {
    const activeDiscounts = await Discount.findActive()
      .sort({ "date.start": -1 })
      .lean();

    res.json(activeDiscounts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const discount = await addDiscount(req.body);
    res.status(201).json(discount);
  } catch (err) {
    next(err);
  }
});

export default router;
