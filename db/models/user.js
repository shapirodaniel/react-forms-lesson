const client = require('../client');

module.exports = {
  getUserAndAddresses,
};

async function getUserAndAddresses(id) {
  const { rows: addresses } = await client.query(
    `
    SELECT 
      users.*, 
      JSON_AGG(a.*, ua.is_primary) AS addresses 
    FROM addresses AS a
    JOIN user_addresses AS ua
    ON a.id=ua.address_id
    JOIN users
    ON users.id=ua.user_id
    WHERE ua.user_id=$1;
  `,
    [id]
  );

  return addresses;
}
