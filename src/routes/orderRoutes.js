const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
router.get('/with-products', orderController.listOrdersWithProducts);

router.post('/', orderController.createOrder);
router.get('/', orderController.listOrders);
router.get('/:id', orderController.getOrder);
router.patch('/:id/status', authMiddleware,orderController.updateStatus);




module.exports = router;