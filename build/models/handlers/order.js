"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new order_1.OrderStore();
const secretToken = process.env.TOKEN_SECRET;
const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (token == undefined)
            return res.status(401).json(`Invalid token`);
        jsonwebtoken_1.default.verify(token, secretToken);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token : ${err}`);
    }
};
const index = async (_req, res) => {
    try {
        const userId = parseInt(_req.params.user_id);
        const result = await store.index(userId);
        if (result.length == 0)
            return res.send(`No orders found for ${userId}`);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const complete = async (_req, res) => {
    try {
        const userId = parseInt(_req.params.user_id);
        const result = await store.completed(userId);
        if (result.length == 0)
            return res.send(`No order compeleted by ${userId}`);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (_req, res) => {
    try {
        const order = {
            id: _req.body.id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            user_id: _req.body.user_id,
            order_status: _req.body.order_status,
        };
        const result = await store.create(order);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const order_routes = (app) => {
    app.get("/orders/:user_id", authToken, index);
    app.get("/completed/:user_id", authToken, complete);
    app.post("/new/order", authToken, create);
};
exports.default = order_routes;
