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