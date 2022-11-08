"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    // Display all users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Display specific user
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    // Create new user 
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            // Test for duplicate id
            const duplicateID = await conn.query("SELECT * FROM users WHERE id = ($1);", [user.id]);
            if (duplicateID.rows[0] !== undefined)
                return 'Duplicate id';
            const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
            const userData = [{
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname,
                    password: hash
                }];
            conn.release();
            return userData;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.UserStore = UserStore;
