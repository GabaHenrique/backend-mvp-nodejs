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