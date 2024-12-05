"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getAllSinSsn());
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Somthing went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
exports.default = patientRouter;
