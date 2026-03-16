const pool = require('../config/database');

exports.createOrder = async (data, connection) => {

  const { total, status} = data; 
  const [result] = await connection.query(
    'INSERT INTO orders (total, status) VALUES (?, ?)',
    [total, status]
  );

  return result.insertId;

};

exports.updateStatus = async (orderId, status, connection) => {

  await connection.query(
    `UPDATE orders
     SET status = ?
     WHERE id = ?`,
    [status, orderId]
  );

};

exports.findAll = async () => {

  const [rows] = await pool.query(
    `SELECT * 
    FROM orders
     ORDER BY id DESC`
  );

  return rows;
};

exports.findById = async (id) => {

  const [rows] = await pool.query(
    `SELECT * 
    FROM orders WHERE id = ?`,
    [id]
  );

  return rows[0];
};

exports.findOrdersWithProducts = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      o.id AS order_id,
      o.status,
      o.total,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name AS product_name,
      p.image
    FROM orders o
    JOIN order_items oi
      ON oi.order_id = o.id
    JOIN products p
      ON p.id = oi.product_id
    ORDER BY o.id DESC
    `
  );

  return rows;

};