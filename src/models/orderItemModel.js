exports.createItem = async (data, connection) => {

  const { order_id, product_id, quantity, price} = data;
  
    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [order_id, product_id, quantity, price]
    );

  };

exports.getItemsByOrderId = async (orderId, connection) => {

  const [rows] = await connection.query(
    `SELECT * FROM order_items WHERE order_id = ?`,
    [orderId]
  );

  return rows;

};