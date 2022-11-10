"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const resetDB_1 = __importDefault(require("../../resetDB"));
const token_1 = __importDefault(require("./token"));
const request = (0, supertest_1.default)(server_1.default);
describe('User endpoints', () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('Show all users with token should success', async () => {
        // This will not hash its password since we are storing it from the model
        const token = await (0, token_1.default)();
        const res = await request.get('/users')
            .auth(token, { type: 'bearer' });
        // Since the password is hashed we cant test the specific result
        // but if result length bigger than zero then the result is shown
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('Show all users without token should fail', async () => {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(401);
    });
    it('Show user by its id with token should success', async () => {
        // This will not hash its password since we are storing it from the model
        const token = await (0, token_1.default)();
        const res = await request.get('/user/299')
            .auth(token, { type: 'bearer' });
        // Since the password is hashed we cant test the specific result
        // but if result length bigger than zero then the result is shown
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('Show user by its id without token should fail', async () => {
        const res = await request.get('/user/204');
        expect(res.statusCode).toEqual(401);
    });
    it('create new user with token should success', async () => {
        // This will not hash its password since we are storing it from the model
        const token = await (0, token_1.default)();
        const res = await request.post('/new/user')
            .send({ "id": 109, "fname": "khalid", "lname": "rami", "password": "password123" })
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json');
        // Since the password is hashed we cant test the specific result
        // but if result length bigger than zero then the result is shown
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('create new user without token should fail', async () => {
        const res = await request.post('/new/user')
            .send({ "id": 102, "name": "blue shirt", "price": 119, "category": "Shirts" })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
    });
});
