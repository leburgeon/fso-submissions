"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
const newDiaryParser = (req, _res, next) => {
    try {
        utils_1.newEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
// Express error handling middlewear. 
// Error handlers take an error as the first paramter, and next as the last parameter
// The error handler is 'used()' after all route handlers that may trigger the error that needs handling
// the error handler can either deal with the error, or if it is not capable of handling the error, passes it to the next error handler
const errorMiddlewear = (error, _req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get('/', (_req, res) => {
    res.send(diaryService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const diaryEntry = diaryService_1.default.findById(Number(req.params.id));
    if (diaryEntry) {
        res.send(diaryEntry);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newDiaryParser, (req, res) => {
    const addedEntry = diaryService_1.default.addDiary(req.body);
    res.json(addedEntry);
});
router.use(errorMiddlewear);
exports.default = router;
