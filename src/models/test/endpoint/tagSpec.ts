import supertest from 'supertest';
import { ProductStore } from "../../product";
import { OrderStore } from "../../order";
import app from '../../../server';
import resetRecord from "../../resetDB";
import createToken from './token';


const request = supertest(app);
const productStore = new ProductStore();
const orderStore = new OrderStore();



let token : string;
describe('tags endpoints', () => {
  // Clearing the database to upcoming actions
  beforeAll(async () => { 
    // creating a new tags from the model sine the database is empty
    await resetRecord();
  });

  it('create new tag with token should success', async () => {
    token = await createToken();
    await productStore.create({id: 101,name: 'leather jacket',price: 49, category: "jackets"});
    await orderStore.create({id: 301,user_id: 299, order_status: "active"});
    const res = await request.post('/new/tag')
    .send({"id": 402, "product_id": 101, "quantity": 4, "order_id": 301})
    .auth(token, { type: 'bearer' })
    .set('Accept', 'application/json');
    
    expect(res.body).toEqual("Created new tag successfully !!");
  });

  it('gets all stored tags', async () => {
    const res = await request.get('/tags')
    .auth(token, { type: 'bearer' });
    expect(res.body).toEqual([
        {id: 402, product_id: 101, quantity: 4, order_id: 301}
    ]);
  });

  it('create new tag without token should fail', async () => {
    const res = await request.post('/new/tag')
    .send({"id": 403, "product_id": 101, "quantity": 4, "order_id": 301})
    .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(401);
  });
});

