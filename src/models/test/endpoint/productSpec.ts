import supertest from 'supertest';
import bcrypt from "bcrypt";
import { ProductStore } from '../../product';
import { User } from '../../user';
import app from '../../../server';
import resetRecord from "../../resetDB";
import jwt from "jsonwebtoken";
import pool from '../../../database';


const request = supertest(app);
const store = new ProductStore();

const createToken = async (user: User) : Promise<string> => {
  const conn = await pool.connect();

  const pepper = process.env.BCRYPT_PASSWORD;
  const saltRounds : any = process.env.SALT_ROUNDS;
  const secretToken : any = process.env.TOKEN_SECRET;

  const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
  const hash = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds)
              ) 
  const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
  const token = jwt.sign({user: result}, secretToken);
  return token;
}


describe('Products endpoints', () => {
  // Clearing the database to upcoming actions
  beforeAll(async () => { 
    await resetRecord();
  });

  it('gets all stored products', async () => {
    // creating a new product from the model sine the database is empty
    await store.create({id:101,name:"leather jackets",price: 49,category: "jackets"});
    const res = await request.get('/products');
    expect(res.body).toEqual([
      { id: 101, name: 'leather jackets', price: 49, category: 'jackets' }
    ]);
  });

  it('gets a product by its id', async () => {
    const res = await request.get('/product/101');
    
    expect(res.body).toEqual([{ id: 101, name: 'leather jackets', price: 49, category: 'jackets' }]);
  });

  it('create new product with token should success', async () => {
    const token = await createToken({id:201,fname:"ibrahim",lname:"khalid", password: "randomPass"})
    const res = await request.post('/new/product')
    .send({"id": 102,"name": "blue shirt","price": 119,"category": "Shirts"})
    .auth(token, { type: 'bearer' })
    .set('Accept', 'application/json');
    
    expect(res.body).toEqual("Created new product successfully !!");
  });

  it('create new product without token should fail', async () => {
    const res = await request.post('/new/product')
    .send({"id": 102,"name": "blue shirt","price": 119,"category": "Shirts"})
    .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(401);
  });
});

