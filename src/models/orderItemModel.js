exports.createItems = async (connection, orderId, items) => {

  for (const item of items) {

    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [orderId, item.product_id, item.quantity, item.price]
    );

  }

};