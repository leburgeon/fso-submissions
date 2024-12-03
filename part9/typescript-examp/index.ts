import express from 'express';
const app = express();
import calculator from './calculator';
import { Operation } from './calculator';

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) {
    res.status(400).send({ error: 'value 1 was not a number'});
    return;
  }

  if ( !value2 || isNaN(Number(value2))) {
    res.status(400).send({ error: 'value 2 was not a number'});
    return;
  }

  // Type assertion only possible when asserting to a more or less specific type. 
  // Eg booleanVal : true | false = false
  // const falseBool = booleanVal as false

  // type assertion can be done when the argument is passed to the function

  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({result});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

