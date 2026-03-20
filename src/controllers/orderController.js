const { json } = require('express');
const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {

  try {

    const orderId = await orderService.createOrder(req.body);

    res.status(201).json({
      message: "Pedido criado com sucesso",
      orderId
    });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);

    res.status(400).json({
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

exports.listOrders = async (req, res) => { 
  try {  
    
    const orders = await orderService.listOrders();  res.json(orders);  } 
  
  catch (error) {  res.status(500).json({
      error: error.message
    });

  }

};

exports.getOrder = async (req, res) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido"
      });
    }

    const order = await orderService.getOrderById(id);

    res.json(order);

  } catch (error) {

    if (error.message === "Pedido não encontrado") {
      return res.status(404).json({
        error: error.message
      });
    }
console.error(error)
    res.status(500).json({
      error: error.message
    });

  }

};


exports.listOrdersWithProducts = async (req, res) => {

  try {

    const orders = await orderService.listOrdersWithProducts();

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};