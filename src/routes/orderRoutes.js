const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const orderController = require('../controllers/orderController');
router.get('/with-products', authMiddleware, orderController.listOrdersWithProducts);

router.post('/', orderController.createOrder);
router.get('/', authMiddleware, orderController.listOrders);
router.get('/:id', authMiddleware, orderController.getOrder);
router.patch('/:id/status', authMiddleware, orderController.updateStatus);

module.exports = router;