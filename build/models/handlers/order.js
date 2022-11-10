"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const auth_1 = __importDefault(require("./auth"));
const store = new order_1.OrderStore();
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
    app.get("/orders/:user_id", auth_1.default, index);
    app.get("/completed/:user_id", auth_1.default, complete);
    app.post("/new/order", auth_1.default, create);
};
exports.default = order_routes;
