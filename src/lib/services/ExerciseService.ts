import IExerciseService from '@/lib/interfaces/ExerciseService'
import { Exercise } from '@/lib/models/Exercise'

export default class ExerciseService implements IExerciseService {
  async fetchAllExercises (): Promise<Exercise[]> {
    const response = await fetch(
      `http://localhost:8000/api/fitness-module/v1/exercise/all`
    )

    return await response.json() as Exercise[]
  }

  async fetchExerciseById (id: string): Promise<Exercise | null> {
    const response = await fetch(
      `http://localhost:8000/api/fitness-module/v1/exercise/byId/${id}`
    )

    if (!response.ok) {
      return null
    }

    return await response.json() as Exercise
  }
}
