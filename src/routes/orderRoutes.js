const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.patch('/:id/status', orderController.updateStatus);

router.post('/', orderController.createOrder);

router.get('/test', (req,res)=>{
  res.send("rota funcionando");
});

module.exports = router;