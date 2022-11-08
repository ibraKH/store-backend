import express, { NextFunction, Request , Response } from "express";
import { Order, OrderStore } from "../order";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new OrderStore();

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
    try{
        const userId = parseInt(_req.params.user_id);
        const result = await store.index(userId);
        if(result.length == 0) return res.send(`No orders found for ${userId}`);
        res.json(result);
    } catch(err) {
        res.status(400).json(err)
    }
    
};

const complete = async (_req: Request, res: Response) => {
    try{
        const userId = parseInt(_req.params.user_id);
        const result = await store.completed(userId);
        if(result.length == 0) return res.send(`No order compeleted by ${userId}`);
        res.json(result);
    } catch(err) {
        res.status(400).json(err)
    }
    
};

const create = async (_req: Request, res: Response) => {
    try{
        const order : Order = {
            id: _req.body.id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            user_id: _req.body.user_id,
            order_status: _req.body.order_status,
        }
        const result = await store.create(order);
        res.json(result);
    } catch(err) {
        res.status(400).json(err)
    }
    
};
const order_routes = (app: express.Application) => {
    app.get("/orders/:user_id", authToken , index)
    app.get("/completed/:user_id", authToken , complete)
    app.post("/new/order", authToken , create)
};

export default order_routes;