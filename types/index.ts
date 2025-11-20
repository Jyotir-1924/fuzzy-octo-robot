export interface FormData {
  name: string
  age: string
  gender: string
  height: string
  weight: string
  goal: string
  level: string
  location: string
  diet: string
  medical: string
  stress: string
}

export interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
  notes: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
}

export interface Workout {
  overview: string
  days: WorkoutDay[]
}

export interface Meals {
  breakfast: string[]
  lunch: string[]
  dinner: string[]
  snacks: string[]
}

export interface Diet {
  overview: string
  dailyCalories: string
  meals: Meals
}

export interface FitnessPlan {
  workout: Workout
  diet: Diet
  tips: string[]
}

export interface ImageModalItem {
  title: string
  description: string
  imageUrl?: string | null
}