<script setup lang="ts">
import {
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader, IonReorder,
  IonReorderGroup, IonHeader,
  IonIcon,
  IonInput, IonToggle,
  IonGrid, IonCol, IonRow,
  IonTitle, IonContent, IonToolbar, IonButtons
} from "@ionic/vue";
import {ref} from "vue";
import {close, arrowBack, checkmark} from 'ionicons/icons';
import ExercisesList from "@/components/Exercises/List.vue";
import {useToggle} from "@vueuse/core";
import {Exercise} from "@/lib/types/Exercise";

type ExerciseSets = Exercise & {
  sets: {
    value: number | null
    reps: number | null
  }[]
}


const exercises = ref<ExerciseSets[]>([])

const [showExerciseModal, toggleExerciseModal] = useToggle()

function addExercise(exercise: Exercise) {
  exercises.value.push({...exercise, sets: [{value: null, reps: null}]})
  showExerciseModal.value = false
}

function addSet(exerciseIndex: number) {
  exercises.value[exerciseIndex].sets.push({value: null, reps: null})
}

function removeSet(exerciseIndex: number, setIndex: number) {
  exercises.value[exerciseIndex].sets.splice(setIndex, 1)
}

function reorder(event: CustomEvent) {
  exercises.value = event.detail.complete(exercises.value);
  console.log(exercises.value);
}

function removeExercise(index: number) {
  exercises.value.splice(index, 1);
}
</script>

<template>
  <ion-list class="ion-margin-top">
    <ion-list-header>
      <ion-title>Exercises</ion-title>
    </ion-list-header>
    <ion-reorder-group :disabled="false" @ionItemReorder="reorder">
      <ion-item v-for="(exercise, exerciseIndex) in exercises" :key="exerciseIndex" class="ion-no-padding">
        <ion-grid>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size="9"><h4>{{ exercise.name }}</h4></ion-col>
            <ion-col>
              <ion-icon @click="removeExercise(exerciseIndex)" :icon="close" />
            </ion-col>
            <ion-col>
              <ion-reorder></ion-reorder>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col><ion-label class="ion-text-center">Set</ion-label></ion-col>
            <ion-col><ion-label class="ion-text-center">KG</ion-label></ion-col>
            <ion-col><ion-label class="ion-text-center">Reps</ion-label></ion-col>
            <ion-col class="ion-text-center"><ion-icon :icon="checkmark" /></ion-col>
            <ion-col></ion-col>
          </ion-row>
          <ion-row v-for="(set, setIndex) in exercise.sets" :key="setIndex" class="ion-justify-content-center ion-align-items-center">
            <ion-col><ion-label class="ion-text-center">{{ setIndex + 1 }}</ion-label></ion-col>
            <ion-col><ion-input class="ion-text-center" fill="solid" v-model="set.value"></ion-input></ion-col>
            <ion-col><ion-input class="ion-text-center" fill="solid" v-model="set.reps"></ion-input></ion-col>
            <ion-col class="ion-text-center"><ion-toggle /></ion-col>
            <ion-col class="ion-text-center"><ion-icon :icon="close" @click="removeSet(exerciseIndex, setIndex)" /></ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-button @click="addSet(exerciseIndex)">Add set</ion-button>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item v-if="exercises.length == 0">
        <ion-label>No exercises yet</ion-label>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
  <br />
  <ion-modal :is-open="showExerciseModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Add exercise</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showExerciseModal = false">
            Cancel
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ExercisesList @click-exercise="addExercise" />
    </ion-content>
  </ion-modal>
  <ion-button expand="block" @click="toggleExerciseModal()">Add exercise</ion-button>
</template>

<style>
  ion-item  {
    background-color: red;
  }
</style>