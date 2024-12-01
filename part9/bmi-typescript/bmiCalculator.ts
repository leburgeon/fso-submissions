interface healthData {
  heightInCm: number,
  massInKg: number
}

const parseArguments = (args: string[]): healthData => {
  // Ensures proper usage
  if (args.length !== 4){
    throw new Error('Please provide two arguments: height in cm and mass in kg')
  }
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))){
    throw new Error('Arguments must be numbers only')
  }

  return {
    heightInCm: Number(args[2]),
    massInKg: Number(args[3])
  }
}

const calculateBmi = (heightInCm: number, massInKg: number): string => {
  const heightInM = heightInCm/100
  const bmi = massInKg / (heightInM ^ 2)
  let message : 'normal' | 'overweight' | 'underweight' | 'obese'

  if (bmi < 18.5){
    message = 'underweight'
  } else if (bmi < 25) {
    message = 'normal'
  } else if (bmi < 30) {
    message = 'overweight'
  } else {
    message = 'obese'
  }

  return 'weight range is ' + message
}

try {
  const { heightInCm, massInKg } = parseArguments(process.argv)
  console.log(calculateBmi(heightInCm, massInKg))
} catch (error: unknown) {
  let errorMessage = 'Somthing went wrong'
  if (error instanceof Error){
    errorMessage += `Error: ${error.message}`
  }
  console.log(errorMessage)
}