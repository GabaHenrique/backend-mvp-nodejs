const db = require('../config/database');
const orderModel = require('../models/orderModel');
const orderItemModel = require('../models/orderItemModel');
const productModel = require('../models/productModel');



exports.createOrder = async (data) => {

  const connection = await db.getConnection();

  try {
    const { items, total } = data;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("O pedido precisa ter pelo menos um item");
    }

    if (total === undefined || total === null || Number(total) <= 0) {
      throw new Error("Total do pedido inválido");
    }

    await connection.beginTransaction();

    for (const item of items) {
      if (!item.product_id || !item.quantity || !item.price) {
        throw new Error("Item do pedido inválido");
      }

    const product = await productModel.getProductForUpdate(
  item.product_id,
  connection
);


if (!product) {
  throw new Error("Produto não encontrado");
}

if (product.stock < item.quantity) {
  console.log("ERRO: estoque insuficiente");
  throw new Error("Estoque insuficiente");
}

    }
       // 1 - CRIAR PEDIDO 

    const orderId = await orderModel.createOrder(
      { total, status: "pending" },
      connection
    );

    for (const item of items) {

        // 2 - CRIAR ITEMS

      await orderItemModel.createItem(
        {
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        },
        connection
      );

      // 3 - ATUALIZAR ESTOQUE
      await productModel.updateStock(
        item.product_id,
        item.quantity,
        connection
      );

    }

    await connection.commit();

    return orderId;

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};


exports.updateOrderStatus = async (orderId, status) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const validStatus = ['pending','completed','cancelled'];

    if (!validStatus.includes(status)) {
      throw new Error("Status inválido");
    }

    if (status === 'cancelled') {

      const items = await orderItemModel.getItemsByOrderId(orderId, connection);

      for (const item of items) {

        await productModel.restoreStock(
          item.product_id,
          item.quantity,
          connection
        );

      }

    }

    await orderModel.updateStatus(orderId, status, connection);

    await connection.commit();

    return { orderId, status };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};

exports.listOrders = async () => {  
  const orders = await orderModel.findAll();  
  
  return orders;};


exports.getOrderById = async (id) => {

  const order = await orderModel.findById(id);

  if (!order) {
    throw new Error("Pedido não encontrado");
  }

  const items = await orderItemModel.getItemsWithProduct(id);

  return {
    ...order,
    items
  };

};

exports.listOrdersWithProducts = async () => {

  const rows = await orderModel.findOrdersWithProducts();

  const orders = {};

  for (const row of rows) {

    if (!orders[row.order_id]) {
      orders[row.order_id] = {
        id: row.order_id,
        status: row.status,
        total: row.total,
        items: []
      };
    }

    orders[row.order_id].items.push({
      product_id: row.product_id,
      product_name: row.product_name,
      image: row.image,
      quantity: row.quantity,
      price: row.price
    });

  }

  return Object.values(orders);

};