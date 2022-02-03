const { client, User, Address, UserAddress } = require('./');
const { getUserAndAddresses } = require('./models/user');

function jsonLog(json) {
  console.log(JSON.stringify(json, null, 2));
}

async function seed() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS user_addresses;
      DROP TABLE IF EXISTS addresses;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL
      );

      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        street_number VARCHAR(255) NOT NULL,
        street_address TEXT NOT NULL,
        city_name VARCHAR(255) NOT NULL,
        state_abbrev_name VARCHAR(2),
        country_name VARCHAR(255) NOT NULL,
        zipcode VARCHAR(5),
        domicile_type domicile
      );

      CREATE TABLE user_addresses (
        user_id INTEGER REFERENCES users (id),
        address_id INTEGER REFERENCES addresses (id),
        is_primary BOOLEAN DEFAULT FALSE,
        UNIQUE(user_id, address_id)
      );
    `);

    await client.query(`
      INSERT INTO users (username)
      VALUES ('alice'), ('bob');

      INSERT INTO addresses (
        street_number, 
        street_address, 
        city_name, 
        state_abbrev_name, 
        country_name, 
        zipcode, 
        domicile_type
      )
      VALUES 
        ('1000', 'Glenview Drive', 'Akron', 'OH', 'USA', '17437', 'apartment'),
        ('18', 'Appian Circle', 'Southwark', 'OR', 'USA', '09238', 'building'),
        ('344', 'Red Barn Way', 'Duluth', 'MN', 'USA', '27630', 'unit');

      INSERT INTO user_addresses
      VALUES 
        (1,1, FALSE),
        (1,2, TRUE),
        (2,2, TRUE),
        (2,3, FALSE);
    `);
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    const newUser = { username: 'albert' };

    const newAddress = {
      street_number: '222',
      street_address: 'New Address Way',
      city_name: 'Newport News',
      state_abbrev_name: 'NH',
      country_name: 'Newland',
      zipcode: '44444',
      domicile_type: 'building',
    };

    const albert = await User.createUser(newUser);

    jsonLog({ albert });

    const newUserAddress = {
      is_primary: true,
      user_id: albert.id,
    };

    const albertAddress = await Address.createAddress(
      newAddress,
      newUserAddress
    );

    jsonLog({ albertAddress });

    const albertUserAddressRecord =
      await UserAddress.getUserAddressByUserIdAndAddressId(
        albert.id,
        albertAddress.id
      );

    jsonLog({ albertUserAddressRecord });

    const updatedAlbertAddress = await Address.updateAddress(albertAddress.id, {
      street_address: 'Updated Street Address',
      zipcode: '57575',
      is_primary: false,
    });

    jsonLog({ updatedAlbertAddress });

    const updatedAlbertUserAddressRecord =
      await UserAddress.getUserAddressByUserIdAndAddressId(
        albert.id,
        albertAddress.id
      );

    jsonLog({ updatedAlbertUserAddressRecord });

    const aliceAndAddresses = await getUserAndAddresses(1);

    jsonLog({ aliceAndAddresses });
  } catch (err) {
    throw err;
  }
}

seed()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
