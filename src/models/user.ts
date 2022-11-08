import pool from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds : any = process.env.SALT_ROUNDS;

export type User = {
    id: Number,
    fname: string,
    lname: string,
    password: string
}

export class UserStore {
    // Display all users
    async index(): Promise<User[]> {
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
            } catch (err) {
                throw new Error(`${err}`);
            }
    }
    // Display specific user
    async show(id: number): Promise<User[]>{
        try{
            const conn = await pool.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Create new user 
    async create(user: User): Promise<Array<User> | string>{
        try{
            const conn = await pool.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM users WHERE id = ($1);", [user.id]); 
            if(duplicateID.rows[0] !== undefined) return 'Duplicate id';
            const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
            const hash = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds)
            )
            const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
            const userData = [{
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                password: hash
            }]
            conn.release();
            return userData;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}