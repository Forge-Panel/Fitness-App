import { defineStore } from 'pinia'
import {Exercise, ExerciseBodyPart, ExerciseCategory} from '@/lib/models/Exercise'
import IExerciseService from '@/lib/interfaces/ExerciseService'
import {computed, ref} from "vue";

let ExerciseService: IExerciseService

export function injectExerciseService (injectedExerciseService: IExerciseService) {
  ExerciseService = injectedExerciseService
}

export const useExerciseStore = defineStore('Exercise', () => {
  const Exercises = ref<Map<number, Exercise>>(new Map())

  const getExerciseById = computed(() => {
    return (ExerciseId: number) => { return Exercises.value.get(ExerciseId) }
  })

  const readExercisesGroupedByCategory = computed(() => {
    const exerciseCategoryMap = new Map<ExerciseCategory, Exercise[]>()

    Exercises.value.forEach((exercise: Exercise) => {
      if (!exerciseCategoryMap.has(exercise.category)) {
        exerciseCategoryMap.set(exercise.category, [])
      }

      exerciseCategoryMap.get(exercise.category)?.push(exercise)
    })

    return exerciseCategoryMap
  })

  const readExercisesGroupedByAlphabet = computed(() => {
    const exerciseAlphabetMap = new Map<string, Exercise[]>();

    Exercises.value.forEach((exercise: Exercise) => {
      // Extract the first letter of the exercise name and convert it to uppercase
      const firstLetter = exercise.name.charAt(0).toUpperCase();

      // Initialize the array for this letter if it doesn't already exist
      if (!exerciseAlphabetMap.has(firstLetter)) {
        exerciseAlphabetMap.set(firstLetter, []);
      }

      // Add the exercise to the appropriate group
      exerciseAlphabetMap.get(firstLetter)?.push(exercise);
    });

    const exerciseAlphabetMapSorted = new Map<string, Exercise[]>();

    exerciseAlphabetMap.keys().toArray().sort((a, b) => a.localeCompare(b))
      .forEach((letter) => {
        const list = exerciseAlphabetMap.get(letter)

        if (!list) {
          return
        }

        exerciseAlphabetMapSorted.set(letter, list);
      });

    return exerciseAlphabetMapSorted
  })

  const readExercisesGroupedByBodyPart = computed(() => {
    const ExerciseBodyPartMap = new Map<ExerciseBodyPart, Exercise[]>()

    Exercises.value.forEach((exercise: Exercise) => {
      if (!ExerciseBodyPartMap.has(exercise.body_part)) {
        ExerciseBodyPartMap.set(exercise.body_part, [])
      }

      ExerciseBodyPartMap.get(exercise.body_part)?.push(exercise)
    })

    return ExerciseBodyPartMap
  })

  async function fetchAllExercises (): Promise<void> {
    const ExercisesResult = await ExerciseService.fetchAllExercises()

    ExercisesResult.forEach(Exercise => {
      Exercises.value.set(Exercise.id, Exercise)
    })
  }

  async function fetchExerciseById (id: string): Promise<Exercise | undefined> {
    const Exercise = await ExerciseService.fetchExerciseById(id)

    if (!Exercise) {
      console.error('Exercise not found :(')
      return
    }

    Exercises.value.set(Exercise.id, Exercise)

    return Exercise
  }

  return { Exercises, getExerciseById, readExercisesGroupedByCategory, readExercisesGroupedByAlphabet, readExercisesGroupedByBodyPart, fetchAllExercises, fetchExerciseById }
})
