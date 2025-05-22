import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Product from "./Product.js";
import { NotFoundError } from "../util/errors.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
    },
    role: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1, 2, 3],
    },
    cart: {
      type: [
        {
          size: String,
          price: Number,
          originalProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      default: [],
    },
    orders: {
      type: [
        {
          status: {
            type: String,
            required: true,
            enum: ["pending", "shipped", "delivered", "cancelled"],
          },
          items: {
            type: [
              {
                size: String,
                price: Number,
                originalProduct: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Product",
                },
                count: {
                  type: Number,
                  required: true,
                  min: 1,
                },
              },
            ],
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.addToCart = async function (product_id, size) {
  const product = await Product.findById(product_id).lean();
  if (!product) throw new NotFoundError("Product Not Found");

  const sizeOption = product.details?.sizes?.find((s) => s.size === size);
  if (!sizeOption)
    throw new NotFoundError("Product with specified size doesn't exists");

  const price = sizeOption.price;

  const existingItem = this.cart.find(
    (item) =>
      item.originalProduct.toString() === product_id.toString() &&
      item.size === size
  );

  if (existingItem) {
    existingItem.count += 1;
  } else {
    this.cart.push({
      originalProduct: product_id,
      size,
      price,
      count: 1,
    });
  }

  return this.save();
};

userSchema.methods.removeFromCart = async function (product_id, size) {
  const productExists = await Product.exists({ _id: product_id });
  if (!productExists) throw new NotFoundError("Product Not Found");

  const existingItemIndex = this.cart.findIndex(
    (item) =>
      item.originalProduct.toString() === product_id && item.size === size
  );
  if (existingItemIndex === -1) throw new NotFoundError("Product not in cart");

  const existingItem = this.cart[existingItemIndex];

  if (existingItem.count > 1) {
    existingItem.count -= 1;
  } else {
    this.cart.splice(existingItemIndex, 1);
  }

  return this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
