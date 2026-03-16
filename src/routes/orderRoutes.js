const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/dashboard', adminController.getDashboard);

const orderController = require('../controllers/orderController');
router.get('/with-products', orderController.listOrdersWithProducts);

router.post('/', orderController.createOrder);
router.get('/', orderController.listOrders);
router.get('/:id', orderController.getOrder);
router.patch('/:id/status', orderController.updateStatus);
router.get('/test', (req,res)=>{
  res.send("rota funcionando");
});



module.exports = router;