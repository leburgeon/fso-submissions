"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRouter = express_1.default.Router();
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnosisService_1.default.getAll());
});
exports.default = diagnosesRouter;
