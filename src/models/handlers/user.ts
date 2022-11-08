import express, { NextFunction, Request , Response } from "express";
import { User, UserStore } from "../user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserStore();

const secretToken : any = process.env.TOKEN_SECRET;

const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if(token == undefined) return res.status(401).json(`Invalid token`)

        jwt.verify(token, secretToken)

        next()
    } catch (err) {
        res.status(401)
        res.json(`Invalid token : ${err}`)
    }
}

const index = async (_req: Request, res: Response) => {
    const result = await store.index();
    res.json(result);
};

const show = async (_req: Request, res: Response) => {
    try{
        const userId = parseInt(_req.params.id);
        const result = await store.show(userId);
        if(result == undefined){
            return res.json(`No result for any user by the ID = ${userId}`)
        }
        
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    
};

const create = async (_req: Request, res: Response) => {
    const user : User = {
        id: _req.body.id,
        fname: _req.body.fname,
        lname: _req.body.lname,
        password: _req.body.password,
    }
    try{
        const result = await store.create(user);
        if(result == "Duplicate id") return res.status(400).json(`Duplicated id = ${user.id}`);
        const token = jwt.sign({user: result}, secretToken);
        res.json(token);
    } catch(err){
        res.status(400).json(err)
    }
};

const user_routes = (app: express.Application) => {
    app.get("/users", authToken , index)
    app.get("/user/:id", authToken , show)
    app.post("/new/user", authToken ,create)
};

export default user_routes;