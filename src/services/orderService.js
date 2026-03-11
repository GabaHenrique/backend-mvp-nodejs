const db = require('../config/database');
const orderModel = require('../models/orderModel');
const orderItemModel = require('../models/orderItemModel');
const productModel = require('../models/productModel');



exports.createOrder = async (data) => {

  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    const { items, total } = data;

    for (const item of items) {

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