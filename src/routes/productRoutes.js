const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.listarProdutos);
router.get('/:id', productController.buscarProduto);
router.post('/', authMiddleware, productController.criarProduto);
router.put('/:id', authMiddleware, productController.atualizarProduto);
router.delete('/:id', authMiddleware, productController.removerProduto);
router.patch('/:id/stock', productController.addStock);

module.exports = router;

