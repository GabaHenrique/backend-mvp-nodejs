const pool = require('../config/database');

exports.findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM orders_full ORDER BY order_id DESC');
    return rows;
};

exports.findByOrderId = async (orderId) => {
    const [rows] = await pool.query('SELECT * FROM orders_full WHERE order_id = ? ORDER BY product_id', [orderId]);
    return rows;
};