import supertest from 'supertest';
import { ProductStore } from '../../product';
import app from '../../../server';
import resetRecord from "../../resetDB";
import createToken from './token';

const request = supertest(app);
const store = new ProductStore();


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
    const token = await createToken()
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

