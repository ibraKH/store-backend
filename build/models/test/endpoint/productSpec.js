"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../product");
const server_1 = __importDefault(require("../../../server"));
const resetDB_1 = __importDefault(require("../../resetDB"));
const token_1 = __importDefault(require("./token"));
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.ProductStore();
describe('Products endpoints', () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('gets all stored products', async () => {
        // creating a new product from the model sine the database is empty
        await store.create({ id: 101, name: "leather jackets", price: 49, category: "jackets" });
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
        const token = await (0, token_1.default)();
        const res = await request.post('/new/product')
            .send({ "id": 102, "name": "blue shirt", "price": 119, "category": "Shirts" })
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json');
        expect(res.body).toEqual("Created new product successfully !!");
    });
    it('create new product without token should fail', async () => {
        const res = await request.post('/new/product')
            .send({ "id": 102, "name": "blue shirt", "price": 119, "category": "Shirts" })
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(401);
    });
});
