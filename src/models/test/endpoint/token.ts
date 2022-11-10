import jwt from "jsonwebtoken";
import pool from '../../../database';
import bcrypt from "bcrypt";
import { User } from "../../user";

// creating fake token to test endpoints
const createToken = async () : Promise<string> => {
    const user : User = {
      id: 299,
      fname: "admin",
      lname: "ibrahim",
      password: "randomTest"
    }
    const conn = await pool.connect();
  
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds : any = process.env.SALT_ROUNDS;
    const secretToken : any = process.env.TOKEN_SECRET;

    const lastToken = await conn.query("SELECT * FROM users WHERE id = ($1);", [user.id]);

    if(lastToken.rows.length > 0){
      const token = jwt.sign({user: lastToken}, secretToken); 
      return token;
    }else{
      const sql = 'INSERT INTO users (id,fname,lname,password) VALUES ($1,$2,$3,$4);';
      const hash = bcrypt.hashSync(
                  user.password + pepper,
                  parseInt(saltRounds)
                ) 
      const result = await conn.query(sql, [user.id, user.fname, user.lname, hash]);
      const token = jwt.sign({user: result}, secretToken);
      return token;
    }
}


export default createToken;