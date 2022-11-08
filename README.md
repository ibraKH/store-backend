## Storefront Backend Udacity Project 

### About the project :
in this project i created full backend API to store products,users and orders for frontend store app .

this project startup code from Udacity [repo](https://github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter.git)

### Used Technologies :
* Postgres
* Express
* jsonwebtoken
* jasmine

### To start the project :
##### Note this project only run locally , With local database
* $ git clone https://github.com/ibraKH/store-backend.git
* $ cd store-backend
* $ npm install -g db-migrate
* $ npm i
* Create .env file and store the following :
PG_HOST = { your database host }
PG_DB = { the name of the database }
PG_DB_TEST = { the name of the testing database }
PG_USER = { your user for the database } 
PG_PASSWORD = { your database password }
ENV = dev
BCRYPT_PASSWORD = { write any pass here }
SALT_ROUNDS = { write any rounds you want }
TOKEN_SECRET = { write any secret here }
* $ npm run start

### Project script :
* test : npm run test
* start the server : npm run start
* TS compile : npm run tsc
* migrate up : npm run migrate
* migrate down : npm run migrate-down

### HTTP routes :
#### Note : Token can be passed in HTTP header with Bearer Token
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