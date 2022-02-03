const client = require('../client');

module.exports = {
  getUserAddressByUserIdAndAddressId,
  getUserAddressesByUserId,
};

async function getUserAddressesByUserId(id) {
  try {
    const { rows: userAddresses } = await client.query(
      `
      SELECT * FROM user_addresses AS ua
      WHERE ua.user_id=$1;
    `,
      [id]
    );

    return userAddresses;
  } catch (err) {
    throw err;
  }
}

async function getUserAddressByUserIdAndAddressId(userId, addressId) {
  try {
    const {
      rows: [userAddress],
    } = await client.query(
      `
      SELECT * FROM user_addresses AS ua
      WHERE ua.user_id=$1 AND ua.address_id=$2;
    `,
      [userId, addressId]
    );

    return userAddress;
  } catch (err) {
    throw err;
  }
}
