const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// GET ALL
async function getOrders(req, res) {
  const user_id = req.user._id;

  const orders = await Order.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(orders);
}

// GET SINGLE
async function getOrder(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID type" });
  }

  const order = await Order.findById(id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "No such order" });
  }
}

// POST
async function createOrder(req, res) {
  const {
    totalAmount,
    totalPrice,
    items,
    phoneNumber,
    address,
    paymentMethod,
    note,
  } = req.body;

  try {
    const user_id = req.user._id;
    const order = await Order.create({
      user_id,
      totalAmount,
      totalPrice,
      items,
      phoneNumber,
      address,
      paymentMethod,
      note,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE
async function deleteOrder(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID type" });
  }

  const order = await Order.findOneAndDelete({ _id: id });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "No such order" });
  }
}

// PATCH
async function updateOrder(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID type" });
  }

  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (order) {
    res.status(200).json(req.body);
  } else {
    res.status(404).json({ message: "No such order" });
  }
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};
