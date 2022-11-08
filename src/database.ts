import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();


let pool : any;


if(process.env.ENV == 'test'){
    pool = new Pool({
        host: process.env.PG_HOST,
        database: process.env.PG_DB_TEST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    });
}

if(process.env.ENV == 'dev'){
    pool = new Pool({
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    });
}


export default pool;