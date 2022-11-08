"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.UserStore();
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
    const result = await store.index();
    res.json(result);
};
const show = async (_req, res) => {
    try {
        const userId = parseInt(_req.params.id);
        const result = await store.show(userId);
        if (result == undefined) {
            return res.json(`No result for any user by the ID = ${userId}`);
        }
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (_req, res) => {
    const user = {
        id: _req.body.id,
        fname: _req.body.fname,
        lname: _req.body.lname,
        password: _req.body.password,
    };
    try {
        const result = await store.create(user);
        if (result == "Duplicate id")
            return res.status(400).json(`Duplicated id = ${user.id}`);
        const token = jsonwebtoken_1.default.sign({ user: result }, secretToken);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const user_routes = (app) => {
    app.get("/users", authToken, index);
    app.get("/user/:id", authToken, show);
    app.post("/new/user", authToken, create);
};
exports.default = user_routes;
