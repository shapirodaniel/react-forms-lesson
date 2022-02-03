const client = require('../client');
const { getAddressesByUserId } = require('./address');
const { getUserAddressesByUserId } = require('./user-address');

module.exports = {
  getUserAndAddresses,
  createUser,
};

async function _getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE users.id=$1;
    `,
      [id]
    );

    return user;
  } catch (err) {
    throw err;
  }
}

async function createUser(userFields) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (username)
      VALUES ($1)
      RETURNING *;
    `,
      Object.values(userFields)
    );

    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserAndAddresses(id) {
  try {
    // don't do this in production
    // it's super slow :D
    const user = await _getUserById(id);
    const addresses = await getAddressesByUserId(id);
    const userAddresses = await getUserAddressesByUserId(id);

    const [{ address_id }] = userAddresses.filter((ua) => ua.is_primary);

    for (let i = 0; i < addresses.length; i++) {
      if (+addresses[i].id === address_id) {
        addresses[i].is_primary = true;
      }
    }

    user.addresses = addresses;
    return user;
  } catch (err) {
    throw err;
  }
}
