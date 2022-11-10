CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id int REFERENCES users(id),
    order_status VARCHAR(255) NOT NULL
);