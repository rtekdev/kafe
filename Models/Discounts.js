import mongoose from "mongoose";

export const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  global: {
    type: Boolean,
    required: true,
    default: false,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  uses: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: {
      start: { type: Date, default: Date.now },
      end: { type: Date },
    },
  },
});

discountSchema.methods.isActive = function () {
  const now = Date.now();
  return this.date.start <= now && (!this.date.end || this.date.end >= now);
};

discountSchema.statics.findActive = function () {
  const now = new Date();
  return this.find({
    "date.start": { $lte: now },
    $or: [{ "date.end": { $gte: now } }, { "date.end": { $exists: false } }],
  });
};

discountSchema.statics.createDiscount = async function (data) {
  data.code = data.code.toUpperCase();
  const discount = new this(data);
  return discount.save();
};

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
