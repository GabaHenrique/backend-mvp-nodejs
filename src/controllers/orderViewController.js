const orderViewService = require('../services/orderViewService');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderViewService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderViewService.getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};