const trycatch = require('express-async-handler');

// Create models
const Order =  require('../../models/Order.js');

// POST: /api/orders/ | Create a new order | Private
const addOrderItems = trycatch( async (req, res) => {
  const { orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in order.");
  }
  else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  }
})

// GET: /api/orders/id | Get the requested order | Private
const getOrderById = trycatch( async (req, res) => {
  const order = await Order.findById(req.params.id).populate('users', 'name email');
  if (order) res.json(order)
  else { res.status(404); throw new Error("Order not found.") }
})

// GET: /api/orders/ | Retrieve all of the user's orders | Private
const getUserOrders = trycatch( async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  if (orders) res.status(200).json(orders);
  else { res.status(404); throw new Error("User orders not found.")};
})

// PUT: /api/orders/id/pay | Set the payment status of the given order | Private
const updateOrderToPaid = trycatch( async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
  else { res.status(404); throw new Error("Order not found.") }
})

module.exports = { addOrderItems, getOrderById, getUserOrders, updateOrderToPaid };
