const client = require('../client');

module.exports = {
  addAddress,
};

async function addAddress(addressFields, userAddressFields) {
  const {
    rows: [address],
  } = await client.query(
    `
    INSERT INTO addresses 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
    Object.values(addressFields)
  );

  await client.query(
    `
    INSERT INTO user_addresses (is_primary, user_id, address_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
    [...Object.values(userAddressFields), address.id]
  );

  return address;
}
