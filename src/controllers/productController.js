const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, page, limit } = req.query;
    const products = await productService.getProducts(category, page, limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// BUSCAR POR ID
exports.buscarProduto = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const produto = await productService.findById(id);
    return res.json(produto);
  } catch (error) {
    next(error);
  }
};

// CRIAR NOVO PRODUTO
exports.criarProduto = async (req, res, next) => {
  try {
    const produto = await productService.create(req.body);
    return res.status(201).json(produto);
  } catch (error) {
    next(error);
  }
};

// ATUALIZAR PRODUTO
exports.atualizarProduto = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID Invalido' });
    }
    const data = req.body;
    await productService.update(id, data);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// DELETAR PRODUTO
exports.removerProduto = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    await productService.remove(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// ADICIONAR STOCK
exports.addStock = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;
    const result = await productService.addStock(productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};