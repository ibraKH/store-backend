
CREATE TABLE product (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL
);
CREATE TABLE users (
    id INT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id int REFERENCES users(id),
    order_status VARCHAR(255) NOT NULL
);
CREATE TABLE products_orders (
	id INT PRIMARY KEY,
	product_id int REFERENCES product(id),
    quantity INT NOT NULL,
    order_id int REFERENCES orders(id)
);