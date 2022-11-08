"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const order_1 = require("../order");
const user_1 = require("../user");
const resetDB_1 = __importDefault(require("../resetDB"));
const store = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
// Creating random data for orders table , We need to create orders to get the top 5 products
const orders = async () => {
    await userStore.create({ id: 101, fname: "ibrahim", lname: "khalid", password: "randompass" });
    await userStore.create({ id: 102, fname: "faisal", lname: "sami", password: "randompass" });
    await userStore.create({ id: 103, fname: "sarah", lname: "rami", password: "randompass" });
    await userStore.create({ id: 104, fname: "yara", lname: "faisal", password: "randompass" });
    await userStore.create({ id: 105, fname: "sami", lname: "ibrahim", password: "randompass" });
    await store.create({ id: 103, name: 'rain jacket', price: 99, category: "jackets" });
    await store.create({ id: 104, name: 'workout jacket', price: 200, category: "jackets" });
    await store.create({ id: 105, name: 'white suit', price: 299, category: "suits" });
    await store.create({ id: 106, name: 'black suit', price: 499, category: "suits" });
    await orderStore.create({ id: 1, product_id: 103, quantity: 7, user_id: 101, order_status: "active" });
    await orderStore.create({ id: 2, product_id: 104, quantity: 12, user_id: 101, order_status: "complete" });
    await orderStore.create({ id: 3, product_id: 106, quantity: 4, user_id: 104, order_status: "active" });
    await orderStore.create({ id: 4, product_id: 105, quantity: 2, user_id: 102, order_status: "active" });
    await orderStore.create({ id: 5, product_id: 101, quantity: 3, user_id: 105, order_status: "active" });
    // Here product_id : 106 have 4 quantity from order id : 3
    // But with order id : 6 the total of all quantity = 4 + 2 = 6
    // Thats mean 6 times this product been ordered or bought 
    await orderStore.create({ id: 6, product_id: 106, quantity: 2, user_id: 103, order_status: "active" });
    await orderStore.create({ id: 7, product_id: 102, quantity: 9, user_id: 102, order_status: "complete" });
};
// Start test here :
describe("Product Model", () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });
    // Test create method
    // Note : in HTTP is should provide user token to create new product
    // But since we are testing the result here , we dont need to provide user token
    it('create method should return a success message', async () => {
        const result = await store.create({
            id: 101,
            name: 'leather jacket',
            price: 49,
            category: "jackets"
        });
        expect(result).toEqual("Created new product successfully !!");
    });
    // Test create method with different values 
    it('create method with different values', async () => {
        const result = await store.create({
            id: 102,
            name: 'denim jeans',
            price: 99,
            category: "jeans"
        });
        expect(result).toEqual("Created new product successfully !!");
    });
    // Test create method with duplicated id
    it('create method with duplicate id should return a failed message', async () => {
        const result = await store.create({
            id: 101,
            name: 'leather jacket',
            price: 49,
            category: "jackets"
        });
        expect(result).toEqual("Duplicate id");
    });
    // Test the return values from index method
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 101,
                name: 'leather jacket',
                price: 49,
                category: "jackets"
            }, {
                id: 102,
                name: 'denim jeans',
                price: 99,
                category: "jeans"
            }]);
    });
    // Test the return value from show method , show method only showing the product by the product id
    it('show method should return a specific product', async () => {
        const result = await store.show(101);
        expect(result).toEqual([{
                id: 101,
                name: 'leather jacket',
                price: 49,
                category: "jackets"
            }]);
    });
    // Test the return values from top 5 products ,
    it('Should show the top 5 products', async () => {
        // Calling the function to start storing new orders which then used to find the top 5 products
        await orders();
        const result = await store.topFive();
        // based on the orders data in the function orders above , we should get the same values as shown below
        // The order of the array is important here since we showing from the top to the least according to quantity
        expect(result).toEqual([
            { id: 104, quantity: '12' },
            { id: 102, quantity: '9' },
            { id: 103, quantity: '7' },
            { id: 106, quantity: '6' },
            { id: 101, quantity: '3' }
        ]);
    });
});
