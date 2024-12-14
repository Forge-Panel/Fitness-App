<script setup lang="ts">
import {
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
} from '@ionic/vue'
import {onBeforeMount, ref} from "vue";
import {useExerciseStore} from "@/stores/exercise";
import {storeToRefs} from "pinia";

async function handleRefresh(event: any) {
  await exerciseStore.fetchAllExercises();
  
  event.target.complete();
}

const exerciseStore = useExerciseStore()

const { readExercisesGroupedByCategory, readExercisesGroupedByAlphabet, readExercisesGroupedByBodyPart } = storeToRefs(exerciseStore)

onBeforeMount(async () => {
  await exerciseStore.fetchAllExercises()
})

const sortBy = ref('alphabet')
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-searchbar></ion-searchbar>
  <ion-label>Order by: </ion-label>
  <ion-chip :color="sortBy === 'alphabet' ? 'primary' : 'default'" @click="sortBy = 'alphabet'">Alphabet</ion-chip>
  <ion-chip :color="sortBy === 'category' ? 'primary' : 'default'" @click="sortBy = 'category'">Category</ion-chip>
  <ion-chip :color="sortBy === 'bodyPart' ? 'primary' : 'default'" @click="sortBy = 'bodyPart'">Body part</ion-chip>
  <ion-list v-if="sortBy === 'alphabet'">
    <template  v-for="(exercises, exerciseKey) in readExercisesGroupedByCategory" :key="exerciseKey">
      <ion-list-header class="ion-padding-top" lines="inset">
        <ion-label><h1>{{ exercises[0] }}</h1></ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exercises[1]" :key="exercise.id">
        <ion-label>{{ exercise.name }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
  <ion-list v-else-if="sortBy === 'category'">
    <template v-for="(exercises, exerciseKey) in readExercisesGroupedByAlphabet" :key="exerciseKey">
      <ion-list-header class="ion-padding-top" lines="inset">
        <ion-label><h1>{{ exercises[0] }}</h1></ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exercises[1]" :key="exercise.id">
        <ion-label>{{ exercise.name }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
  <ion-list v-else-if="sortBy === 'bodyPart'">
    <template v-for="(exercises, exerciseKey) in readExercisesGroupedByBodyPart" :key="exerciseKey">
      <ion-list-header class="ion-padding-top" lines="inset">
        <ion-label><h1>{{ exercises[0] }}</h1></ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exercises[1]" :key="exercise.id">
        <ion-label>{{ exercise.name }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
</template>

<style scoped>

</style>