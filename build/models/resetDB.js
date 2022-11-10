"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
// This used to clear all the records in the database
// This helpfull when testing different models
// because when testing models the store data will be cause error for other models
// Ex : we did create user in product model test so it will give us an error when testing user model
const resetRecords = async () => {
    const conn = await database_1.default.connect();
    const reset = await conn.query("SET session_replication_role = 'replica';DELETE FROM product cascade;DELETE FROM users cascade;DELETE FROM orders cascade;DELETE FROM products_orders cascade;SET session_replication_role = 'origin';");
    conn.release();
};
exports.default = resetRecords;
