import calculateBmi, { parseBmiArgs } from '../bmiCalculator';
import { Router } from 'express';

const bmiRouter : Router = Router()

bmiRouter.get('/', (req, res) => {
  const { height, weight } = req.query
  if (!height || !weight){
    res.status(400).send({error: 'must include height and weight query string parameters'})
  } else {
    try {
      const { heightInCm, massInKg } = parseBmiArgs(Number(height), Number(weight))
      const bmi = calculateBmi(heightInCm, massInKg)
      res.status(200).send({
        height: heightInCm,
        weight: massInKg,
        bmi
      })
    } catch (error: unknown) {
      let errorMessage = 'Error with the bmi calculator: '
      if (error instanceof Error) {
        errorMessage += error.message
      }
      res.status(500).send({error: errorMessage})
    }
  }

  
})

export default bmiRouter