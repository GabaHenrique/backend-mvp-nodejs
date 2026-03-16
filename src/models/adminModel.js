const pool = require('../config/database');

exports.findByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM admin_users WHERE email = ?',
        [email]
    );

    return rows[0];
};

exports.create = async (name, email, hashedPassword, role = 'admin') => {
    const [result] = await pool.query(
        'INSERT INTO admin_users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
    );

    return result.insertId;
};



exports.getDashboardMetrics = async () => {

  const [orders] = await pool.query(
    `SELECT COUNT(*) AS total_orders FROM orders`
  );

  const [sales] = await pool.query(
    `SELECT SUM(total) AS total_sales
     FROM orders
     WHERE status = 'completed'`
  );

  const [pending] = await pool.query(
    `SELECT COUNT(*) AS pending_orders
     FROM orders
     WHERE status = 'pending'`
  );

  const [topProducts] = await pool.query(
    `
    SELECT
      p.name,
      SUM(oi.quantity) AS total_sold
    FROM order_items oi
    JOIN products p
      ON p.id = oi.product_id
    GROUP BY p.id
    ORDER BY total_sold DESC
    LIMIT 5
    `
  );

  return {
    total_orders: orders[0].total_orders,
    total_sales: sales[0].total_sales || 0,
    pending_orders: pending[0].pending_orders,
    top_products: topProducts
  };

};