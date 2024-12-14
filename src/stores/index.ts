import { createPinia } from 'pinia'
import { injectExerciseService } from '@/stores/exercise'
import ExerciseService from '@/lib/services/ExerciseService'

injectExerciseService(new ExerciseService())

export default createPinia()
