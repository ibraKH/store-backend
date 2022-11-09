"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const order_1 = require("../../order");
const user_1 = require("../../user");
const product_1 = require("../../product");
const server_1 = __importDefault(require("../../../server"));
const resetDB_1 = __importDefault(require("../../resetDB"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../../database"));
const request = (0, supertest_1.default)(server_1.default);
const store = new order_1.OrderStore();
const productStore = new product_1.ProductStore();
const userStore = new user_1.UserStore();
const createToken = async (user) => {
    const conn = await database_1.default.connect();
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;
    const secretToken = process.env.TOKEN_SECRET;
    const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
    const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
    const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
    const token = jsonwebtoken_1.default.sign({ user: result }, secretToken);
    return token;
};
describe('Order endpoints', () => {
    // Clearing the database to upcoming actions
    beforeAll(async () => {
        await (0, resetDB_1.default)();
    });
    it('Current Order by user with token should success', async () => {
        await productStore.create({ id: 101, name: "leather jackets", price: 49, category: "jackets" });
        // This will not hash its password since we are storing it from the model
        await userStore.create({ id: 201, fname: "ibrahim", lname: "khalid", password: "randomPass" });
        await store.create({ id: 301, product_id: 101, quantity: 2, user_id: 201, order_status: "active" });
        const token = await createToken({ id: 203, fname: "sarah", lname: "sami", password: "sarah123" });
        const res = await request.get('/orders/201')
            .auth(token, { type: 'bearer' });
        expect(res.body).toEqual([
            { id: 301, product_id: 101, quantity: 2, user_id: 201, order_status: 'active' }
        ]);
    });
    it('Current Order by user without token should fail', async () => {
        const res = await request.get('/orders/201');
        expect(res.statusCode).toEqual(401);
    });
});
