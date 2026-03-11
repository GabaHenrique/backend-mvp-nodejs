const pool = require('../config/database');

exports.findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.findByName = async (name) => {
  const [rows] = await pool.query(
    'SELECT * FROM products WHERE name = ?',
    [name]
  );
  return rows[0];
};

exports.create = async (product) => {
  const [result] = await pool.query(
    `INSERT INTO products (name, description, price, stock, image)
     VALUES (?, ?, ?, ?, ?)`,
    [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.image
    ]
  );

  return {
    id: result.insertId,
    ...product
  };
};

exports.update = async (id, data) => {
  await pool.query(
    `UPDATE products
     SET name = ?, description = ?, price = ?, stock = ?, image = ?
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.price,
      data.stock,
      data.image,
      id
    ]
  );
};

exports.remove = async (id) => {
  await pool.query(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
};

exports.updateStock = async (productId, quantity, connection) => {

  const[result] = await connection.query (
      `UPDATE products
       SET stock = stock - ?
       WHERE id = ? AND stock >= ?`,
      [quantity, productId, quantity]
    );
if (result.affectedRows === 0) {
  throw new Error("Estoque insuficiente");
  }

};

exports.getProductForUpdate = async (productId, connection) => {

  const [rows] = await connection.query(
    `SELECT * FROM products WHERE id = ? FOR UPDATE`,
    [productId]
  );

  return rows[0];
};


exports.addStock = async (productId, quantity) => {

  const [result] = await pool.query(
    `
    UPDATE products
    SET stock = stock + ?
    WHERE id = ?
    `,
    [quantity, productId]
  );

  return result;
};

