CREATE TYPE domicile AS ENUM ('apartment', 'building', 'unit');

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