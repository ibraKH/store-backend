import supertest from 'supertest';
import app from '../../../server';
import resetRecord from "../../resetDB";
import createToken from './token';

const request = supertest(app);

describe('User endpoints', () => {
  // Clearing the database to upcoming actions
  beforeAll(async () => { 
    await resetRecord();
  });

  it('Show all users with token should success', async () => {
    // This will not hash its password since we are storing it from the model
    const token = await createToken();
    const res = await request.get('/users')
    .auth(token, { type: 'bearer' })
    
    
    // Since the password is hashed we cant test the specific result
    // but if result length bigger than zero then the result is shown
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Show all users without token should fail', async () => {
    const res = await request.get('/users')
    
    expect(res.statusCode).toEqual(401);
  });

  it('Show user by its id with token should success', async () => {
    // This will not hash its password since we are storing it from the model
    const token = await createToken();
    const res = await request.get('/user/299')
    .auth(token, { type: 'bearer' })
    
    
    // Since the password is hashed we cant test the specific result
    // but if result length bigger than zero then the result is shown
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Show user by its id without token should fail', async () => {
    const res = await request.get('/user/204')
    
    expect(res.statusCode).toEqual(401);
  });

  it('create new user with token should success', async () => {
    // This will not hash its password since we are storing it from the model
    const token = await createToken();
    const res = await request.post('/new/user')
    .send({"id": 109,"fname": "khalid","lname": "rami","password": "password123"})
    .auth(token, { type: 'bearer' })
    .set('Accept', 'application/json');
    
    // Since the password is hashed we cant test the specific result
    // but if result length bigger than zero then the result is shown
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('create new user without token should fail', async () => {
    const res = await request.post('/new/user')
    .send({"id": 102,"name": "blue shirt","price": 119,"category": "Shirts"})
    .set('Accept', 'application/json');
    
    expect(res.statusCode).toEqual(401);
  });
});

