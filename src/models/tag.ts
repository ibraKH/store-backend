import pool from "../database";

export type Tag = {
    id: Number,
    product_id: Number,
    quantity: Number,
    order_id: Number
}

export class TagStore {
    // Display all tags
    async index(): Promise<Tag[]> {
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM products_orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
    // Create new tag
    async create(productOrder: Tag): Promise<string>{
        try{
            const conn = await pool.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM products_orders WHERE id = ($1);", [productOrder.id]); 
            if(duplicateID.rows[0] !== undefined) return 'Duplicate id';
            const sql = 'INSERT INTO products_orders (id,product_id,quantity,order_id) VALUES ($1,$2,$3,$4);';
            const result = await conn.query(sql, [productOrder.id, productOrder.product_id, productOrder.quantity, productOrder.order_id]);
            conn.release();
            return 'Created new tag successfully !!';
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}