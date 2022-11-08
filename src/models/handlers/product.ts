import express, { NextFunction, Request , Response } from "express";
import { Product, ProductStore } from "../product";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new ProductStore();

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
        res.json(`Invalid token ${err}`)
    }
}

const index = async (_req: Request, res: Response) => {
    const result = await store.index();
    res.json(result);
};

const show = async (_req: Request, res: Response) => {
    const productId = parseInt(_req.params.id);
    const result = await store.show(productId);
    res.json(result);
};

const create = async (_req: Request, res: Response) => {
    const product : Product = {
        id: _req.body.id,
        name: _req.body.name,
        price: _req.body.price,
        category: _req.body.category,
    }
    const result = await store.create(product);
    res.json(result);
};

const topFive = async (_req: Request, res: Response) => {
    const result = await store.topFive();
    res.json(result);
};

const showByCategory = async (_req: Request, res: Response) => {
    const catagory = _req.params.catagory;
    const result = await store.showByCategory(catagory);
    res.json(result);
};

const product_routes = (app: express.Application) => {
    app.get("/products", index)
    app.get("/product/:id", show)
    app.post("/new/product", authToken , create)
    app.get("/products/topfive", topFive)
    app.get("/products/:catagory", showByCategory)
};

export default product_routes;