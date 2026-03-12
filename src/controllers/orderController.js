const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {

  try {

    const orderId = await orderService.createOrder(req.body);

    res.status(201).json({
      message: "Pedido criado",
      orderId
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

exports.updateStatus = async (req, res) => {

  try {

const orderId = req.params.id;
const { status } = req.body;

const result = await orderService.updateOrderStatus(orderId, status);

  res.status(200).json({
    message: "Status atualizado",
    order: result
    });

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }

};