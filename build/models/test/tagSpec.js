"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const tag_1 = require("../tag");
const order_1 = require("../order");
const user_1 = require("../user");
const resetDB_1 = __importDefault(require("../resetDB"));
const store = new tag_1.TagStore();
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
// Start test here :
describe("tags Model", () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
        await productStore.create({ id: 101, name: 'leather jacket', price: 49, category: "jackets" });
        await userStore.create({ id: 201, fname: "ibrahim", lname: "khalid", password: "randomPass" });
        await orderStore.create({ id: 301, user_id: 201, order_status: "active" });
    });
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should return a success message', async () => {
        const result = await store.create({ id: 401, product_id: 101, quantity: 4, order_id: 301 });
        expect(result).toEqual("Created new tag successfully !!");
    });
    // Test create method with duplicated id
    it('create method with duplicate id should return a failed message', async () => {
        const result = await store.create({ id: 401, product_id: 101, quantity: 4, order_id: 301 });
        expect(result).toEqual("Duplicate id");
    });
    it('index method should return tags', async () => {
        const result = await store.index();
        expect(result).toEqual([{ id: 401, product_id: 101, quantity: 4, order_id: 301 }]);
    });
});
