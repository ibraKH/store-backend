CREATE TABLE products_orders (
	id INT PRIMARY KEY,
	product_id int REFERENCES product(id),
    quantity INT NOT NULL,
    order_id int REFERENCES orders(id)
);