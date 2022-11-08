import pool from "../database";

export type Product = {
    id: Number,
    name: string,
    price: Number,
    category: string
}

export class ProductStore {
    // Display all products
    async index(): Promise<Product[]> {
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM product;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
    // Display specific product
    async show(id: number): Promise<Product[]>{
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM product WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Create new product 
    async create(product: Product): Promise<string>{
        try{
            const conn = await pool.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM product WHERE id = ($1);", [product.id]); 
            if(duplicateID.rows[0] !== undefined) return 'Duplicate id';
            const sql = 'INSERT INTO product (id,name,price,category) VALUES ($1,$2,$3,$4);';
            const result = await conn.query(sql, [product.id, product.name, product.price, product.category]);
            conn.release();
            return 'Created new product successfully !!';
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Display the top 5 products
    async topFive(): Promise<unknown>{
        try{
            const conn = await pool.connect();
            const sql = 'SELECT id, SUM(quantity) as quantity FROM (SELECT product.id,orders.quantity FROM orders INNER JOIN product ON orders.product_id = product.id) AS topFive GROUP BY id ORDER BY quantity DESC LIMIT 5 OFFSET 0;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Show products by category
    async showByCategory(category: string): Promise<Product>{
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM product WHERE category = ($1);';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}