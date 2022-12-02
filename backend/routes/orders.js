const express = require("express");
const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

router.delete("/:id", deleteOrder);

router.patch("/:id", updateOrder);

module.exports = router;
