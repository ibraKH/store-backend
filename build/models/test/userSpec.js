"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const resetDB_1 = __importDefault(require("../resetDB"));
const store = new user_1.UserStore();
// Start test here :
describe("User Model", () => {
    // Clearing the table records to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });
    // Note : in HTTP is should provide user token to create new product
    // But since we are testing the result here , we dont need to provide user token
    it('Should create method return valid data', async () => {
        const result = await store.create({
            id: 101,
            fname: "ibrahim",
            lname: "khalid",
            password: "randomPass"
        });
        // Since we cant match hashed password , we will test the length of the result
        expect(result.length).toEqual(1);
    });
    // Test the create method with different values
    it('Should create method return valid data 2', async () => {
        const result = await store.create({
            id: 102,
            fname: "sarah",
            lname: "waled",
            password: "randomPass"
        });
        // Since we cant match hashed password , we will test the length of the result
        expect(result.length).toEqual(1);
    });
    it('Should index method return all valid data', async () => {
        const result = await store.show(102);
        // Since we cant match hashed password , we will test the length of the result
        expect(result.length).toEqual(1);
    });
    // Test the return values from show method but with wrong id
    it('Should index method return all valid data', async () => {
        const result = await store.show(120);
        expect(result.length).toEqual(0);
    });
});
