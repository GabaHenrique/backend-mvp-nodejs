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