// Import Libraries
const express = require("express");
const router = express.Router();
const { private } = require("../../middleware/authMW");
const {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
} = require("../actions/orderController.js");

// GET: /api/orders/ | Retrieve all of the user's orders | Private
// POST api/orders/ | Create a new order | Private
router.route("/").post(private, addOrderItems).get(private, getUserOrders);
// GET: /api/orders/id | Get the requested order | Private
router.route("/:id").get(private, getOrderById);
// PUT: /api/orders/id/pay | Set the payment status of the given order | Private
router.route("/:id/pay").put(private, updateOrderToPaid);

module.exports = router;
