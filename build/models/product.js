"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    // Display all products
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Display specific product
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Create new product 
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM product WHERE id = ($1);", [product.id]);
            if (duplicateID.rows[0] !== undefined)
                return 'Duplicate id';
            const sql = 'INSERT INTO product (id,name,price,category) VALUES ($1,$2,$3,$4);';
            const result = await conn.query(sql, [product.id, product.name, product.price, product.category]);
            conn.release();
            return 'Created new product successfully !!';
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Display the top 5 products
    async topFive() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT product_id, SUM(quantity) as quantity FROM (SELECT product_id,quantity FROM products_orders) AS topFive GROUP BY product_id ORDER BY quantity DESC LIMIT 5 OFFSET 0;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Show products by category
    async showByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product WHERE category = ($1);';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
