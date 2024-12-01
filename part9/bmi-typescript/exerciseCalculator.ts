interface result  {
  periodLength: number,
  trainingDays: number,
  dailyTarget: number,
  dailyAverage: number,
  success: boolean,
  rating: 1 | 2 | 3,
  description: string
}

interface exerciseData {
  dailyTarget: number,
  exerciseHours: number[]
}

const parseArgHours = (args: string[]): exerciseData => {
  // Checks there are enough args
  if (args.length < 4){
    throw new Error('Must provide a target, and at least one day of exercise')
  }

  // Slices the exercise arguments from the argument array
  const exerciseArguments = args.slice(2)

  // Converts the strings to numbers and throws error if NaN
  const exerciseArgumentsAsNumber = exerciseArguments.map(arg => {
    const asNumber = Number(arg)
    if (isNaN(asNumber)){
      throw new Error('Arguments must all be numbers')
    }
    return asNumber
  })

  // Returns the exercise data object
  const [dailyTarget, ...exerciseHours] = exerciseArgumentsAsNumber
  return {
    dailyTarget, 
    exerciseHours
  }
}

const calculateExercises = (dailyTarget: number, dailyHours: number[]): result => {
  // for calculating the total length of the training period
  const periodLength = dailyHours.length
  // Throws an error if the length is zero
  if (periodLength === 0){
    throw new Error("Number of days must be greater than zero")
  }

  // Stores the days where training occured in an array
  const onlyTrainingDays = dailyHours.filter(hours => hours !== 0)

  // Reduces the trainging days array to calculate the total hours for the period
  const totaltrainingHours = onlyTrainingDays.reduce((prev, curr) => {
    return prev + curr
  })

  // Calculates the daily average
  const dailyAverage = totaltrainingHours / periodLength

  // Determines whether the target was met
  const success = dailyAverage >= dailyTarget

  let rating : 1 | 2 | 3
  let description

  if (success) {
    rating = 3,
    description = "Smashed it!"
  } else {
    const factorComplete = dailyAverage / dailyTarget
    if (factorComplete >= 0.9){
      rating = 2
      description = 'Almost made it! Try again next week!'
    } else {
      rating = 1
      description = 'Not this week. Try again next week!'
    }
  }

  return {
    periodLength,
    trainingDays: onlyTrainingDays.length,
    success,
    rating,
    description,
    dailyTarget,
    dailyAverage
  }
}

try {
  const { dailyTarget, exerciseHours } = parseArgHours(process.argv)
  const result = calculateExercises(dailyTarget, exerciseHours)
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'There was a problem: '
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`
  }
  console.log(errorMessage)
}