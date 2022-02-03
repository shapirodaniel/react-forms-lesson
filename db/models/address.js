const client = require('../client');

module.exports = {
  createAddress,
  updateAddress,
  getAddressesByUserId,
};

async function getAddressesByUserId(id) {
  try {
    const { rows: addresses } = await client.query(
      `
      SELECT a.* FROM addresses AS a
      JOIN user_addresses AS ua
      ON ua.user_id=$1
      WHERE ua.address_id=a.id;
    `,
      [id]
    );

    return addresses;
  } catch (err) {
    throw err;
  }
}

async function createAddress(addressFields, userAddressFields) {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
    INSERT INTO addresses (
      street_number,
      street_address,
      city_name,
      state_abbrev_name,
      country_name,
      zipcode,
      domicile_type
    )
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
  } catch (err) {
    throw err;
  }
}

// this helper fn builds field=placeholder strings for pg
// ex, field=$1
function buildSetString(fields, offset = 1) {
  const placeholderString = Object.values(fields).map(
    (_, idx) => `$${idx + offset}`
  );

  const fieldsString = Object.keys(fields);

  const setString = placeholderString
    .map((val, idx) => `${fieldsString[idx]}=${val}`)
    .join(',');

  return setString;
}

async function updateAddress(id, addressFields) {
  try {
    const { is_primary } = addressFields;

    delete addressFields.is_primary;

    const setString = buildSetString(addressFields, 2);

    const {
      rows: [address],
    } = await client.query(
      `
      UPDATE addresses 
      SET ${setString}
      WHERE addresses.id=$1
      RETURNING *;
    `,
      [id, ...Object.values(addressFields)]
    );

    if (is_primary !== undefined) {
      await client.query(
        `
        UPDATE user_addresses AS ua
        SET is_primary=$1
        WHERE ua.address_id=${address.id}
        RETURNING *;
      `,
        [is_primary]
      );
    }

    return address;
  } catch (err) {
    throw err;
  }
}
