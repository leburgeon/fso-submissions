import express from 'express';
import { Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

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

router.post('/', (req, res) => {
  const newEntry = toNewDiaryEntry(req.body);
  const addedEntry = diaryService.addDiary(newEntry);
  res.json(addedEntry);
});

export default router;