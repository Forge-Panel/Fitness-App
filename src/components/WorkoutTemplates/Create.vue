<script setup lang="ts">

import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader, IonReorder,
  IonReorderGroup, IonTextarea,
  IonTitle
} from "@ionic/vue";
import {ref} from "vue";

const name = ref("")

const exercises = ref([
  {
    name: 'Exercise',
    
  }
])

function AddExercise() {
  exercises.value.push({name: 'Exercise new'})
}

function reorder(event: CustomEvent) {
  exercises.value = event.detail.complete(exercises.value);
  console.log(exercises.value);
}
</script>

<template>
  <ion-list :inset="true">
    <ion-list-header>
      <ion-title>Workout settings</ion-title>
    </ion-list-header>
    <ion-item>
      <ion-input label-placement="floating" label="Workout name" v-model="name" placeholder="Your workout name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-textarea label-placement="floating" label="Description" v-model="name" placeholder="Describe the workout"></ion-textarea>
    </ion-item>
  </ion-list>
  
  <ion-list :inset="true">
    <ion-list-header>
      <ion-title>Exercises</ion-title>
    </ion-list-header>
    <ion-reorder-group :disabled="false" @ionItemReorder="reorder">
      <ion-item v-for="(exercise, index) in exercises" :key="index">
        <ion-label>{{ exercise.name }} {{ index + 1 }}</ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
  <br />
  <ion-button expand="block" @click="AddExercise">Add exercise</ion-button>
</template>

<style scoped>

</style>