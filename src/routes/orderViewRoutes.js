const express = require('express');
const router = express.Router();
const orderViewController = require('../controllers/orderViewController');

// GET todos pedidos
router.get('/', orderViewController.getAllOrders);

// GET pedido por ID
router.get('/:id', orderViewController.getOrderById);

module.exports = router;