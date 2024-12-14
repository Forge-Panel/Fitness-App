import { Exercise } from '@/lib/models/Exercise'

export default interface IExerciseService {
  fetchAllExercises(): Promise<Exercise[]>;

  fetchExerciseById(id: string): Promise<Exercise | null>;
}
