"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaries_1 = __importDefault(require("./routes/diaries"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_req, res) => {
    console.log('Somone pinged right here');
    res.status(200).send('pong');
});
app.use('/api/diaries', diaries_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});
