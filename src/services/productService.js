const productModel = require('../models/productModel');
const { ValidationError, ConflictError, NotFoundError } = require('../errors/AppError');

exports.create = async (data) => {
  if (!data.name?.trim()) {
    throw new ValidationError('Name é obrigatorio');
  }

  if (!data.description?.trim()) {
    throw new ValidationError('Description é obrigatoria');
  }

  if (data.price === undefined || isNaN(Number(data.price))) {
    throw new ValidationError('Price é obrigatoria');
  }

  if (Number(data.price) <= 0) {
    throw new ValidationError('Price deve ser maior que zero');
  }

  const name = await productModel.findByName(data.name);

  if (name) {
    throw new ConflictError('Name ja cadastrado');
  }

  return await productModel.create({
    name: data.name.trim(),
    description: data.description || null,
    price: Number(data.price),
    stock: Number(data.stock),
    category: data.category || null,
    image: data.image || null
  });
};

exports.update = async (id, data) => {
  const produto = await productModel.findById(id);

  if (!produto) {
    throw new NotFoundError('Produto não encontrado');
  }

  if ('name' in data) {
    if (!data.name?.trim()) {
      throw new ValidationError('Name não pode ser vazio');
    }
    const nameExistente = await productModel.findByName(data.name);

    if (nameExistente && nameExistente.id !== id) {
      throw new ConflictError('Name ja cadastrado');
    }
  }

  const dadosCompletos = {
    name: data.name ?? produto.name,
    description: data.description ?? produto.description,
    price: data.price !== undefined ? Number(data.price) : produto.price,
    stock: data.stock !== undefined ? Number(data.stock) : produto.stock,
    category: data.category ?? produto.category,
    image: data.image ?? produto.image
  };

  return await productModel.update(id, dadosCompletos);
};

exports.findById = async (id) => {
  const produto = await productModel.findById(id);

  if (!produto) {
    throw new NotFoundError('Produto não encontrado');
  }

  return produto;
};

exports.remove = async (id) => {
  const produto = await productModel.findById(id);

  if (!produto) {
    throw new NotFoundError('Produto não encontrado');
  }

  return await productModel.remove(id);
};

exports.addStock = async (productId, quantity) => {
  if (quantity <= 0) {
    throw new ValidationError("Quantidade inválida");
  }

  const product = await productModel.findById(productId);

  if (!product) {
    throw new NotFoundError("Produto não encontrado");
  }

  await productModel.addStock(productId, quantity);

  return {
    message: "Estoque atualizado"
  };
};

exports.getProducts = async (category, page, limit) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const hasPagination =
    !Number.isNaN(parsedPage) &&
    !Number.isNaN(parsedLimit) &&
    parsedPage > 0 &&
    parsedLimit > 0;

  if (hasPagination) {
    const offset = (parsedPage - 1) * parsedLimit;

    if (category) {
      return await productModel.getProductsByCategoryPaginated(
        category,
        parsedLimit,
        offset
      );
    }

    return await productModel.getAllProductsPaginated(parsedLimit, offset);
  }

  if (category) {
    return await productModel.getProductsByCategory(category);
  }

  return await productModel.getAllProducts();
};