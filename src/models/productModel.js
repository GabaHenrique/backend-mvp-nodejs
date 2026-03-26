const pool = require('../config/database');

exports.getAllProducts = async () => {

  const [rows] = await pool.query(
    `SELECT * FROM products
     ORDER BY id DESC`,
    
  );

  return rows;

};

exports.getProductsByCategory = async (category) => {

  const [rows] = await pool.query(
    `SELECT * FROM products
     WHERE category = ?
     ORDER BY id DESC`,
    [category]
  );

  return rows;
};

exports.getAllProductsPaginated = async (limit, offset) => {
  const [rows] = await pool.query(
    `SELECT * FROM products
    ORDER BY id DESC
    LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );
  return rows;
};

exports.getProductsByCategoryPaginated = async (category, limit, offset) => {
  const [rows] = await pool.query(
    `SELECT * FROM products
    WHERE category = ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?`,
    [category, Number(limit), Number(offset)]
  );

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
    `INSERT INTO products (name, description, price, stock, category, image)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.category,
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
     SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ?
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.price,
      data.stock,
      data.category,
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


exports.restoreStock = async (productId, quantity, connection) => {

  await connection.query(
    `UPDATE products
     SET stock = stock + ?
     WHERE id = ?`,
    [quantity, productId]
  );

};


