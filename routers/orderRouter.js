import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.delete(
  "/orderslist/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deletedOrders = await Order.findById(req.params.id);
    if (deletedOrders) {
      await deletedOrders.remove();
      res.send({ message: "Order Deleted" });
    } else {
      res.send("Error in Deletion");
    }
  })
);
orderRouter.get(
  "/orderslist",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        createdAt: new Date(),
        user: req.user._id,
      });

      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "Sifariş yaradıldı", order: createdOrder });
    }
  })
);
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Sifariş tapılmadı" });
    }
  })
);
orderRouter.put(
  "/:id/pay",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.send({ message: "Ödəniş edildi", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Sifariş tapılmadı" });
    }
  })
);
export default orderRouter;
