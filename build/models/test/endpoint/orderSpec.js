"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const order_1 = require("../../order");
const user_1 = require("../../user");
const server_1 = __importDefault(require("../../../server"));
const resetDB_1 = __importDefault(require("../../resetDB"));
const token_1 = __importDefault(require("./token"));
const request = (0, supertest_1.default)(server_1.default);
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
describe('Order endpoints', () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('Current Order by user with token should success', async () => {
        // This will not hash its password since we are storing it from the model
        await userStore.create({ id: 201, fname: "ibrahim", lname: "khalid", password: "randomPass" });
        await store.create({ id: 301, user_id: 201, order_status: "active" });
        const token = await (0, token_1.default)();
        const res = await request.get('/orders/201')
            .auth(token, { type: 'bearer' });
        expect(res.body).toEqual([
            { id: 301, user_id: 201, order_status: 'active' }
        ]);
    });
    it('Current Order by user without token should fail', async () => {
        const res = await request.get('/orders/201');
        expect(res.statusCode).toEqual(401);
    });
});
