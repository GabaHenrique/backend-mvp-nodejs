exports.create = async (connection, total) => {

  const [result] = await connection.query(
    'INSERT INTO orders (total, status) VALUES (?, ?)',
    [total, 'pending']
  );

  return result.insertId;

};