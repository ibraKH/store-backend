## Storefront Backend Udacity Project 

### About the project :
in this project i created full backend API to store products,users and orders for frontend store app .

this project startup code from Udacity [repo](https://github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter.git)

### Used Technologies :
* Postgres
* Express
* jsonwebtoken
* bcrypt
* jasmine

### To start the project :
##### Note this project only run locally , With local database
* $ git clone https://github.com/ibraKH/store-backend.git
* $ cd store-backend
* $ npm install -g db-migrate
* $ npm i
* Create .env file , Look to Connecting to DB section down below 
* $ npm run start 

### Project script :
* test : npm run test
* start the server : npm run start
* TS compile : npm run tsc
* migrate up : npm run migrate
* migrate down : npm run migrate-down

### Connecting to DB :
##### You have to connect to DB to use this project , to connect :
- Download [postgresql](https://www.postgresql.org/download/) if not already downloaded in you machine 
- Open psql and write your info
- then write this sql : CREATE DATABASE storebackend;
- also write this sql for testing : CREATE DATABASE storebackend_test;
- Write \l to display all your databases
- then write the following in .env file in the project : <br>
PG_HOST = { your database host } <br>
PG_DB = { the name of the database } <br>
PG_DB_TEST = { the name of the testing database } <br>
PG_USER = { your user for the database } <br>
PG_PASSWORD = { your database password } <br>
ENV = dev <br>
BCRYPT_PASSWORD = { write any pass here } <br>
SALT_ROUNDS = { write any rounds you want } <br>
TOKEN_SECRET = { write any secret here } <br>

### HTTP routes :
##### This project runs on port : 3000 , "localhost:3000"
##### Note : Token can be passed in HTTP header with Bearer Token
#### Products :
- Show all products (Index) : [http://localhost:3000/products]
- Search by product id (Show) : [http://localhost:3000/product/:id]
- Create : [http://localhost:3000/new/product][TOKEN REQUIRED]
- top 5 products : [http://localhost:3000/products/topfive]
- Search by catagory id : [http://localhost:3000/products/:catagory]
#### Users :
- Show all users (Index) : [http://localhost:3000/users][TOKEN REQUIRED]
- Search by user id (Show) : [http://localhost:3000/user/:id][TOKEN REQUIRED]
- Create : [http://localhost:3000/new/user][TOKEN REQUIRED]
#### Orders :
- Current Order by user : [http://localhost:3000/orders/:user_id][TOKEN REQUIRED]
- Completed Orders by user : [http://localhost:3000/completed/user_id][TOKEN REQUIRED]
#### tags :
- Show all tags : [http://localhost:3000/tags]
- Create new tag : [http://localhost:3000/new/tag][TOKEN REQUIRED]