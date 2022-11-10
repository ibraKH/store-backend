import express, { Request , Response } from "express";
import { Product, ProductStore } from "../product";
import authToken from "./auth";

const store = new ProductStore();

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