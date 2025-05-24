import mongoose from "mongoose";
import { NotFoundError } from "../util/errors.js";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    details: {
      type: {
        type: String,
        required: true,
        enum: ["espresso", "americano", "cappuccino", "brewed", "cold brew"],
      },
      origin: { type: String, default: "Unknown" },
      roastLevel: {
        type: String,
        enum: ["light", "medium", "dark"],
        default: "medium",
      },
      caffeineContent: { type: Number, default: 80 },
      sizes: [
        {
          size: { type: String, enum: ["S", "M", "L"], required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    extras: [
      {
        type: String,
        enum: ["vanilla", "caramel", "whipped cream", "chocolate drizzle"],
      },
    ],
    image: String,
    description: {
      type: String,
      required: true,
      default: "",
    },
    promotion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discount" }],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    availability: { type: Boolean, default: true },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, min: 1, max: 5, required: true },
          comment: String,
          date: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

productSchema.methods.addDiscount = async function (discount_id) {
  const discount = await mongoose.model("Discount").findById(discount_id);
  if (!discount) throw new NotFoundError("Discount not found");

  if (this.promotion.some((dId) => dId.equals(discount_id)))
    throw new Error("This discount is already added to product");

  this.promotion.push(discount._id);
  await this.save();

  return this;
};

productSchema.methods.removeDiscount = async function (discount_id) {
  const Discount = mongoose.model("Discount");
  const discount = await Discount.findById(discount_id);
  if (!discount) {
    throw new NotFoundError("Discount not found");
  }

  if (!this.promotion.some((dId) => dId.equals(discount_id))) {
    throw new Error("This discount is not added to the product");
  }

  this.promotion.pull(discount_id);
  await this.save();

  return this;
};

const Product = mongoose.model("Product", productSchema);
export default Product;
