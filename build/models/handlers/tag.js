"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../tag");
const auth_1 = __importDefault(require("./auth"));
const store = new tag_1.TagStore();
const index = async (_req, res) => {
    const result = await store.index();
    res.json(result);
};
const create = async (_req, res) => {
    try {
        const tag = {
            id: _req.body.id,
            product_id: _req.body.product_id,
            quantity: _req.body.quantity,
            order_id: _req.body.order_id,
        };
        const result = await store.create(tag);
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
};
const tag_routes = (app) => {
    app.get("/tags", index);
    app.post("/new/tag", auth_1.default, create);
};
exports.default = tag_routes;
