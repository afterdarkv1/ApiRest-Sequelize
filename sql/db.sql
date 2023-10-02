CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  price INTEGER,
  description VARCHAR(300),
  brandId INTEGER,
  userId INTEGER,
  FOREIGN KEY (brandId) REFERENCES brands(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  gmail VARCHAR(255)
);
