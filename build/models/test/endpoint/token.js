"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// creating fake token to test endpoints
const createToken = async () => {
    const user = {
        id: 299,
        fname: "admin",
        lname: "ibrahim",
        password: "randomTest"
    };
    const conn = await database_1.default.connect();
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;
    const secretToken = process.env.TOKEN_SECRET;
    const lastToken = await conn.query("SELECT * FROM users WHERE id = ($1);", [user.id]);
    if (lastToken.rows.length > 0) {
        const token = jsonwebtoken_1.default.sign({ user: lastToken }, secretToken);
        return token;
    }
    else {
        const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
        const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
        const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
        const token = jsonwebtoken_1.default.sign({ user: result }, secretToken);
        return token;
    }
};
exports.default = createToken;
