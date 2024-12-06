import express, { NextFunction } from 'express';
import { Response, Request } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import { newEntrySchema } from '../utils';
import { ZodError } from 'zod';

const router = express.Router();

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

// Express error handling middlewear. 
// Error handlers take an error as the first paramter, and next as the last parameter
// The error handler is 'used()' after all route handlers that may trigger the error that needs handling
// the error handler can either deal with the error, or if it is not capable of handling the error, passes it to the next error handler
const errorMiddlewear = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diaryEntry = diaryService.findById(Number(req.params.id));
  if (diaryEntry){
    res.send(diaryEntry);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res:Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry)
});

router.use(errorMiddlewear)
export default router;