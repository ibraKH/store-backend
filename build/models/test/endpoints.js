"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../product");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const store = new product_1.ProductStore();
describe('Test Home page response', () => {
    it('gets Home page', async () => {
        await store.create({ id: 101, name: "leather jackets", price: 49, category: "jackets" });
        const res = await request.get('/products');
        expect(res.statusCode).toEqual(200);
    });
});
