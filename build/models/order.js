"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    // Show user's orders
    async index(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1);';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Show completed orders by user
    async completed(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND order_status = ($2)';
            const complete = 'complete';
            const result = await conn.query(sql, [userId, complete]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Optional creating order , this method help us to determine the top 5 products
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM product WHERE id = ($1);", [order.id]);
            if (duplicateID.rows[0] !== undefined)
                return 'Duplicate id';
            const sql = 'INSERT INTO orders (id,user_id,order_status) VALUES ($1,$2,$3);';
            const result = await conn.query(sql, [order.id, order.user_id, order.order_status]);
            conn.release();
            return 'Created new order successfully !!';
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
