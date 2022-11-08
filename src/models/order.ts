import pool from "../database";

export type Order = {
    id: Number,
    product_id: Number,
    quantity: Number,
    user_id: Number,
    order_status: string
}

export class OrderStore {
    // Show user's orders
    async index(userId: Number): Promise<Order[]> {
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1);';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
    // Show completed orders by user
    async completed(userId: Number): Promise<Order[]> {
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1) AND order_status = ($2)';
            const complete = 'complete';
            const result = await conn.query(sql, [userId, complete]);
            conn.release();
            return result.rows;
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
    // Optional creating order , this method help us to determine the top 5 products
    async create(order: Order): Promise<unknown> {
        try{
            const conn = await pool.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM product WHERE id = ($1);", [order.id]); 
            if(duplicateID.rows[0] !== undefined) return 'Duplicate id';
            const sql = 'INSERT INTO orders (id,product_id,quantity,user_id,order_status) VALUES ($1,$2,$3,$4,$5);';
            const result = await conn.query(sql, [order.id,order.product_id,order.quantity,order.user_id,order.order_status]);
            conn.release();
            return 'Created new order successfully !!';
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
}