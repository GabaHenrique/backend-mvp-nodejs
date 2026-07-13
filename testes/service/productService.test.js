const productService = require ('../../src/services/productService');

jest.mock('../../src/models/productModel');

const productModel = require('../../src/models/productModel');

beforeEach(() => {
    jest.clearAllMocks();
});

test("create rejeita preço menor ou igual a zero", async () => {
    
const data = {
    name: "Bike Aro 29",
    description: "Bike de trilha",
    price: 0,
    stock: 5
  };

  await expect(productService.create(data)).rejects.toThrow("Price deve ser maior que zero");

  expect(productModel.create).not.toHaveBeenCalled();

});

test("create rejeita nome já cadastrado", async () => {

  productModel.findByName.mockResolvedValue({ id: 5, name: "Bike Aro 29" });

  const data = {
    name: "Bike Aro 29",
    description: "Bike de trilha",
    price: 800,
    stock: 5
  };

  await expect(productService.create(data)).rejects.toThrow("Name ja cadastrado");

  expect(productModel.create).not.toHaveBeenCalled();

});

test("update mantém campos não enviados, sem apagar com NULL", async () => {

  productModel.findById.mockResolvedValue({
    id: 1,
    name: "Bike Aro 29",
    description: "Bike de trilha",
    price: 800,
    stock: 5,
    category: "bikes",
    image: "bike.jpg"
  });

  await productService.update(1, { price: 999 });

  expect(productModel.update).toHaveBeenCalledWith(1, {
    name: "Bike Aro 29",
    description: "Bike de trilha",
    price: 999,
    stock: 5,
    category: "bikes",
    image: "bike.jpg"
  });

});