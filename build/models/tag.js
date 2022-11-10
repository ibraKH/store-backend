"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagStore = void 0;
const database_1 = __importDefault(require("../database"));
class TagStore {
    // Display all tags
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products_orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Create new tag
    async create(productOrder) {
        try {
            const conn = await database_1.default.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM products_orders WHERE id = ($1);", [productOrder.id]);
            if (duplicateID.rows[0] !== undefined)
                return 'Duplicate id';
            const sql = 'INSERT INTO products_orders (id,product_id,quantity,order_id) VALUES ($1,$2,$3,$4);';
            const result = await conn.query(sql, [productOrder.id, productOrder.product_id, productOrder.quantity, productOrder.order_id]);
            conn.release();
            return 'Created new tag successfully !!';
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.TagStore = TagStore;
