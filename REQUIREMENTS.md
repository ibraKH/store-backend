# Database schema :
#### tables name and each column name and type
### Product :
- id : INT
- name : VARCHAR
- price : INT
- category : VARCHAR
### Users :
- id : INT 
- fname : VARCHAR
- lname : VARCHAR
- password : VARCHAR
### Orders :
- id : INT
- user_id : INT REFERENCES users(id)
- order_status : VARCHAR
### products_orders : 
- id : INT
- product_id : INT REFERENCES product(id)
- quantity : INT
- order_id : INT REFERENCES orders(id)