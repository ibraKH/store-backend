"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const auth_1 = __importDefault(require("./auth"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const result = await store.index();
    res.json(result);
};
const show = async (_req, res) => {
    const productId = parseInt(_req.params.id);
    const result = await store.show(productId);
    res.json(result);
};
const create = async (_req, res) => {
    const product = {
        id: _req.body.id,
        name: _req.body.name,
        price: _req.body.price,
        category: _req.body.category,
    };
    const result = await store.create(product);
    res.json(result);
};
const topFive = async (_req, res) => {
    const result = await store.topFive();
    res.json(result);
};
const showByCategory = async (_req, res) => {
    const catagory = _req.params.catagory;
    const result = await store.showByCategory(catagory);
    res.json(result);
};
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/new/product", auth_1.default, create);
    app.get("/products/topfive", topFive);
    app.get("/products/:catagory", showByCategory);
};
exports.default = product_routes;
