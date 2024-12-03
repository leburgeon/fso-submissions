import express from 'express';
const exerciseRouter = express.Router();
import calculateExercises from '../exerciseCalculator';
import { parseArgHours } from '../exerciseCalculator';

exerciseRouter.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  console.log('#################################');
  console.log(dailyExercises);

  if (!dailyExercises) {
    res.status(400).send({ error: 'must include daily exercises array'});
    return;
  }

  if (!target){
    res.status(400).send({ error: 'must include daily target'});
    return;
  }

  try {
    const { dailyTarget, exerciseHours } = parseArgHours([target as string, ...dailyExercises as string[]]);
    const results = calculateExercises(dailyTarget, exerciseHours);
    res.status(200).send(results);
  } catch (error: unknown) {
    let errorMessage = 'Error calculating results:';
    if (error instanceof Error){
      errorMessage += error.message;
    }
    res.status(400).send({error: errorMessage});
  }

});

export default exerciseRouter;