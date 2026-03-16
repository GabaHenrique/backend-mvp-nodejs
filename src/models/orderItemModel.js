const pool = require('../config/database');

exports.createItem = async (data, connection) => {

  const { order_id, product_id, quantity, price} = data;
  
    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [order_id, product_id, quantity, price]
    );

  };

exports.getItemsByOrderId = async (orderId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_items
    WHERE order_id = ?
    `,
    [orderId]
  );

  return rows;
};



exports.getItemsWithProduct = async (orderId) => {

  const [rows] = await pool.query(
    `
    SELECT
      oi.product_id,
      p.name AS product_name,
      p.image,
      oi.quantity,
      oi.price
    FROM order_items oi
    JOIN products p
      ON oi.product_id = p.id
    WHERE oi.order_id = ?
    `,
    [orderId]
  );

  return rows;

};