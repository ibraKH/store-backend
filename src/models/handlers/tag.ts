import express, { Request , Response } from "express";
import { Tag, TagStore } from "../tag";
import authToken from "./auth";


const store = new TagStore();

const index = async (_req: Request, res: Response) => {
    const result = await store.index();
    res.json(result);
};

const create = async (_req: Request, res: Response) => {
    try{
        const tag : Tag = {
            id: _req.body.id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            order_id: _req.body.order_id,
        }
        const result = await store.create(tag);
        res.json(result);
    } catch(err){
        console.log(err);
    } 
};


const tag_routes = (app: express.Application) => {
    app.get("/tags" , index)
    app.post("/new/tag", authToken , create)
};

export default tag_routes;