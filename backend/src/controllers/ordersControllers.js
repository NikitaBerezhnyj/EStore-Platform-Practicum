const { Order, validateOrder } = require("../models/orderModel");
const { User } = require("../models/userModel");

exports.createOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const {
      customer,
      seller,
      items,
      total,
      status,
      date,
      delivery_address,
      payment_method,
      payment_status,
      notes
    } = req.body;

    const newOrder = new Order({
      customer,
      seller,
      items,
      total,
      status: status || "Pending",
      date: date || Date.now(),
      delivery_address,
      payment_method,
      payment_status,
      notes: notes || null
    });

    await newOrder.save();

    res.status(201).send({ message: "Order created successfully!" });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.product", "name price");

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    const customer = await User.findById(order.customer).select("name email phone");
    const seller = await User.findById(order.seller).select("name email phone");

    if (!customer || !seller) {
      return res.status(404).send({ message: "Customer or Seller not found" });
    }

    res.status(200).send({
      order,
      customer,
      seller
    });
  } catch (err) {
    console.error("Error getting order:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { customer, seller, items, total, status, date } = req.body;

    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    order.customer = customer || order.customer;
    order.seller = seller || order.seller;
    order.items = items || order.items;
    order.total = total || order.total;
    order.status = status || order.status;
    order.date = date || order.date;

    await order.save();

    res.status(200).send({ message: "Order updated successfully!" });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    await order.deleteOne();

    res.status(200).send({ message: "Order deleted successfully!" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
