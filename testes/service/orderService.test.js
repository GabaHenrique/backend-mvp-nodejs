const orderService = require('../../src/services/orderService');

jest.mock('../../src/models/productModel');
jest.mock('../../src/models/orderModel');
jest.mock('../../src/models/orderItemModel');

jest.mock('../../src/config/database', () => ({
  getConnection: jest.fn()
}));

const productModel = require('../../src/models/productModel');
const orderModel = require('../../src/models/orderModel');
const orderItemModel = require('../../src/models/orderItemModel');
const db = require('../../src/config/database');

const mockConnection = {
  beginTransaction: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
  release: jest.fn(),
  query: jest.fn()
};

db.getConnection.mockResolvedValue(mockConnection);

beforeEach(() => {
  jest.clearAllMocks();
  db.getConnection.mockResolvedValue(mockConnection);
});

test("deve criar pedido com estoque suficiente", async () => {

  productModel.getProductForUpdate.mockResolvedValue({
    id:1,
    stock:10
  });

  orderModel.createOrder.mockResolvedValue(1);

  orderItemModel.createItem.mockResolvedValue();

  const data = {
    total:100,
    items:[
      {
        product_id:1,
        quantity:2,
        price:50
      }
    ]
  };

  const result = await orderService.createOrder(data);

  expect(result).toBe(1);

});

test("não deve criar pedido com estoque insuficiente", async () => {

  productModel.getProductForUpdate.mockResolvedValue({
    id: 1,
    stock: 1
  });

  const data = {
    total: 100,
    items: [
      {
        product_id: 1,
        quantity: 5,
        price: 50
      }
    ]
  };

  await expect(orderService.createOrder(data)).rejects.toThrow("Estoque insuficiente");

  expect(mockConnection.rollback).toHaveBeenCalled();
  expect(mockConnection.commit).not.toHaveBeenCalled();
  expect(orderModel.createOrder).not.toHaveBeenCalled();

});