"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const order_1 = require("../order");
const user_1 = require("../user");
const resetDB_1 = __importDefault(require("../resetDB"));
const store = new order_1.OrderStore();
const productStore = new product_1.ProductStore();
const userStore = new user_1.UserStore();
describe("Order Model", () => {
    // Clearing the table records to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });
    // Note : in HTTP is should provide user token to create new order
    // But since we are testing the result here , we dont need to provide user token
    it("Get current order by user", async () => {
        // create user and product
        await productStore.create({ id: 101, name: 'rain jacket', price: 99, category: "jackets" });
        await userStore.create({ id: 101, fname: "ibrahim", lname: "khalid", password: "randompass" });
        await store.create({ id: 1, product_id: 101, quantity: 7, user_id: 101, order_status: "active" });
        const result = await store.index(101);
        expect(result).toEqual([{
                id: 1,
                product_id: 101,
                quantity: 7,
                user_id: 101,
                order_status: "active"
            }]);
    });
    it("Get completed orders by user", async () => {
        // new completed order
        await store.create({ id: 2, product_id: 101, quantity: 7, user_id: 101, order_status: "complete" });
        const result = await store.completed(101);
        expect(result).toEqual([{
                id: 2,
                product_id: 101,
                quantity: 7,
                user_id: 101,
                order_status: "complete"
            }]);
    });
});
