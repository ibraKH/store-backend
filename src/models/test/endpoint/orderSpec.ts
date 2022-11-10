import supertest from 'supertest';
import { OrderStore } from '../../order';
import { UserStore } from '../../user';
import app from '../../../server';
import resetRecord from "../../resetDB";
import createToken from './token';


const request = supertest(app);
const store = new OrderStore();
const userStore = new UserStore();



describe('Order endpoints', () => {
  // Clearing the database to upcoming actions
  beforeAll(async () => { 
    await resetRecord();
  });

  it('Current Order by user with token should success', async () => {
    // This will not hash its password since we are storing it from the model
    await userStore.create({id:201,fname:"ibrahim",lname:"khalid",password:"randomPass"});
    await store.create({id:301,user_id: 201, order_status: "active"});
    const token = await createToken()
    const res = await request.get('/orders/201')
    .auth(token, { type: 'bearer' })
    
    expect(res.body).toEqual([
        {id: 301,user_id: 201,order_status: 'active'}
      ]);
  });

  it('Current Order by user without token should fail', async () => {
    const res = await request.get('/orders/201')
    
    expect(res.statusCode).toEqual(401);
  });
});

