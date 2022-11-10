"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../product");
const order_1 = require("../../order");
const server_1 = __importDefault(require("../../../server"));
const resetDB_1 = __importDefault(require("../../resetDB"));
const token_1 = __importDefault(require("./token"));
const request = (0, supertest_1.default)(server_1.default);
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
let token;
describe('tags endpoints', () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        // creating a new tags from the model sine the database is empty
        await (0, resetDB_1.default)();
    });
    it('create new tag with token should success', async () => {
        token = await (0, token_1.default)();
        await productStore.create({ id: 101, name: 'leather jacket', price: 49, category: "jackets" });
        await orderStore.create({ id: 301, user_id: 299, order_status: "active" });
        const res = await request.post('/new/tag')
            .send({ "id": 402, "product_id": 101, "quantity": 4, "order_id": 301 })
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json');
        expect(res.body).toEqual("Created new tag successfully !!");
    });
    it('gets all stored tags', async () => {
        const res = await request.get('/tags')
            .auth(token, { type: 'bearer' });
        expect(res.body).toEqual([
            { id: 402, product_id: 101, quantity: 4, order_id: 301 }
        ]);
    });
    it('create new tag without token should fail', async () => {
        const res = await request.post('/new/tag')
            .send({ "id": 403, "product_id": 101, "quantity": 4, "order_id": 301 })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
    });
});
