const orderService = require('../services/orderService');

exports.createOrder = async (req, res, next) => {
  try {
    const orderId = await orderService.createOrder(req.body);
    res.status(201).json({
      message: "Pedido criado com sucesso",
      orderId
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(orderId, status);
    res.status(200).json({
      message: "Status atualizado",
      order: result
    });
  } catch (error) {
    next(error);
  }
};

exports.listOrders = async (req, res, next) => {
  try {
    const orders = await orderService.listOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const order = await orderService.getOrderById(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.listOrdersWithProducts = async (req, res, next) => {
  try {
    const orders = await orderService.listOrdersWithProducts();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};