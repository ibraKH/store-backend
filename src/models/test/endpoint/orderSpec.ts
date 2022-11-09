import supertest from 'supertest';
import bcrypt from "bcrypt";
import { OrderStore } from '../../order';
import { User, UserStore } from '../../user';
import { ProductStore } from '../../product';
import app from '../../../server';
import resetRecord from "../../resetDB";
import jwt from "jsonwebtoken";
import pool from '../../../database';


const request = supertest(app);
const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();


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


describe('Order endpoints', () => {
  // Clearing the database to upcoming actions
  beforeAll(async () => { 
    await resetRecord();
  });

  it('Current Order by user with token should success', async () => {
    await productStore.create({id:101,name:"leather jackets",price: 49,category: "jackets"});
    // This will not hash its password since we are storing it from the model
    await userStore.create({id:201,fname:"ibrahim",lname:"khalid",password:"randomPass"});
    await store.create({id:301,product_id: 101,quantity: 2,user_id: 201, order_status: "active"});
    const token = await createToken({id:203,fname:"sarah",lname:"sami", password: "sarah123"})
    const res = await request.get('/orders/201')
    .auth(token, { type: 'bearer' })
    
    expect(res.body).toEqual([
        {id: 301,product_id: 101,quantity: 2,user_id: 201,order_status: 'active'}
      ]);
  });

  it('Current Order by user without token should fail', async () => {
    const res = await request.get('/orders/201')
    
    expect(res.statusCode).toEqual(401);
  });
});

