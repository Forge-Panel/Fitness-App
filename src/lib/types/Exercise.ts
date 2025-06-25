export enum ExerciseCategory {
  BARBELL = "Barbell",
  DUMBBELL = "Dumbbell",
  KETTLEBELL = "Kettlebell",
  MACHINE = "Machine",
  CABLE = "Cable",
  WEIGHTED_BODYWEIGHT = "Weighted bodyweight",
  ASSISTED_BODY = "Assisted body",
  CARDIO = "Cardio",
  DURATION = "Duration"
}

export enum ExerciseBodyPart {
  CORE = "Core",
  ARMS = "Arms",
  BACK = "Back",
  CHEST = "Chest",
  LEGS = "Legs",
  SHOULDERS = "Shoulders",
  FULL_BODY = "Full body",
  OTHER = "Other"
}

export type Exercise = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  category: ExerciseCategory;
  bodyPart: ExerciseBodyPart;
  createdAt: Date;
  lastModified: Date;
}
