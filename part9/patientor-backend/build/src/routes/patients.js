"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const patientRouter = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    try {
        // If the request body parses through the request validator without throwing error,
        utils_1.newPatientSchema.parse(req.body);
        //moves onto the next request handler
        next();
    }
    catch (error) {
        // If an error is thrown, the error is passed to the error handler
        next(error);
    }
};
const errorHandler = (error, _req, res, next) => {
    // If the error is an instance of zod error, the request validator has thrown an error, and the issues are returned in the response
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({ error: error.issues });
        // Else if the error is of a different type, the error is passed along to future error hanlders for type checking
    }
    else {
        next(error);
    }
};
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getAllSinSsn());
});
patientRouter.post('/', newPatientParser, (req, res) => {
});
patientRouter.use(errorHandler);
exports.default = patientRouter;
