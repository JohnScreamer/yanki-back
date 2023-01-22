import Order from "../models/order.js";

class OrderController {
    async order(req, res) {
        try {
            const order = new Order({
                ...req.body,
            });
            const newData = await order.save();
            res.status(201).json({
                status: "ok",
                message: "Order created",
                newData,
            });
        } catch (error) {
            return res.status(400).json({ message: "error", error });
        }
    }
    async getAllUserOrder(req, res) {
        try {
            const { id } = req.params;
            const orders = await Order.find({ user: id }).populate("goods");

            res.json({ data: orders, status: "ok" });
        } catch (error) {
            res.status(400).json({
                data: null,
            });
        }
    }
}

export default new OrderController();
