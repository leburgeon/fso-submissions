"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ping', (_req, res) => {
    console.log('somone pinged right about here');
    res.status(200).send('pong');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});