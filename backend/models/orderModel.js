const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  totalAmount: Number,
  totalPrice: Schema.Types.Decimal128,
  items: [],
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  note: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
