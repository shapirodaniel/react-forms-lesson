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