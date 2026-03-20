const productService = require('../services/productService');


exports.getProducts = async (req, res) => {

  
  const category = req.query.category;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;

  try {

    const products = await productService.getProducts(
      category,
      page,
      limit
    );

    res.json(products);

  }  catch (error) {
    console.error("ERRO COMPLETO getProducts:");
    console.error(error);
    console.error("CATEGORY:", category);
    console.error("PAGE:", page);
    console.error("LIMIT:", limit);
  res.status(500).json({ error: error.message || "Erro interno no servidor" });{

   }
  }

};
   
// BUSCAR POR ID
exports.buscarProduto = async (req, res) => {
 try {
   const id = Number(req.params.id);
   if (Number.isNaN(id)) {
   return res.status(400).json({ error: 'ID inválido' });
}
    const produto = await productService.findById(id);
    return res.json(produto);
    } catch (error) { 
        if (error.message === 'Produto não encontrado') {
    return res.status(404).json({error: error.message})};
    return res.status(500).json({error: 'Erro interno servidor'});
}};

// CRIAR NOVO PRODUTO
exports.criarProduto = async (req, res) => {
  try {
  const produto = await productService.create(req.body);
    return res.status(201).json(produto);
  }
   catch (error) {

    console.error('ERRO REAL:', error);
    if (error.message === 'Name ja cadastrado') {
    return res.status(409).json({ error: error.message });
  }

  if (
  error.message === 'Name é obrigatorio' ||
  error.message === 'Description é obrigatorio'
) {
  return res.status(400).json({ error: error.message });
}

return res.status(500).json({ error: 'Erro interno no servidor' });
}
};

// ATUALIZAR PRODUTO
    exports.atualizarProduto = async (req, res) => {
        try {
        const id = Number(req.params.id);
        if (Number.isNaN(id))
        return res.status(400).json({error: 'ID Invalido'});
     const data = req.body;
        await productService.update(id, data); 
        return res.status(204).send()

        }
    catch (error) {if (error.message === 'Produto não encontrado')  
        return res.status(404).json({error: error.message});
        return res.status(500).json({error:'Erro interno servidor'});
        }};
        
       


// DELETAR PRODUTO
exports.removerProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    await productService.remove(id);
    res.status(204).send(); // sem conteúdo de resposta
    } catch  (error) {
        if (error.message === 'Produto não encontrado') {
       return res.status(404).json({error: error.message})
        }
     return res.status(500).json({ error: 'Erro interno no servidor' })
}};


// ADICIONAR STOCK
exports.addStock = async (req, res) => {

  try {

    const productId = req.params.id;
    const { quantity } = req.body;

    const result = await productService.addStock(productId, quantity);

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }

};


