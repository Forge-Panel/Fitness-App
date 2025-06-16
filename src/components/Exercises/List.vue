<script setup lang="ts">
import {
  IonChip,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
} from '@ionic/vue'
import {computed, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag'
import { barbell } from 'ionicons/icons';

const { result, loading, error, refetch } = useQuery(gql`
      query getExercises {
        exercises {
          all(count: 1000) {
            id
            name
            category
            bodyPart
          }
        }
      }
    `)

async function handleRefresh(event: any) {
  refetch()
  
  event.target.complete();
}

const filter = ref('')
const sortBy = ref('name')

const exercises = computed(() => {
  if (!result.value?.exercises?.all) {
    return []
  }
  
  const exerciseMap = new Map()
  
  const output = [...result.value?.exercises?.all]
  
  // Filter, Sort based on name, then group them by the sortBy value,
  output
    .filter(exercise => {
      if (filter.value === '') return true
      
      return exercise.name.toLowerCase().includes(filter.value.toLowerCase()) ||
        exercise.category.toLowerCase().includes(filter.value.toLowerCase()) ||
        exercise.bodyPart.toLowerCase().includes(filter.value.toLowerCase())
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(exercise => {
      let groupKey = sortBy.value === 'name' ? exercise.name[0].toUpperCase() : exercise[sortBy.value]
      
      if (!exerciseMap.has(groupKey)) {
        exerciseMap.set(groupKey, [])
      }
      
      exerciseMap.get(groupKey).push(exercise)
    })
  
  // And to finish up, sort them on the grouped by key.
  return exerciseMap.entries().toArray().sort((a: [string, any], b: [string, any]) => a[0].localeCompare(b[0]))
});
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-searchbar v-model="filter"></ion-searchbar>
  <ion-label>Order by: </ion-label>
  <ion-chip :color="sortBy === 'name' ? 'primary' : 'default'" @click="sortBy = 'name'">Alphabet</ion-chip>
  <ion-chip :color="sortBy === 'category' ? 'primary' : 'default'" @click="sortBy = 'category'">Category</ion-chip>
  <ion-chip :color="sortBy === 'bodyPart' ? 'primary' : 'default'" @click="sortBy = 'bodyPart'">Body part</ion-chip>
  <template v-if="exercises">
    <ion-list v-for="exerciseGroup in exercises" :key="exerciseGroup[0]" class="ion-margin-top" lines="none">
      <ion-list-header>
        <ion-label>
          <h1>{{ exerciseGroup[0] }}</h1>
        </ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exerciseGroup[1]" :key="exercise.id" @click="console.log" button>
        <ion-icon aria-hidden="true" :icon="barbell" slot="start"></ion-icon>
        <ion-label>
          <h2>{{ exercise.name }}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
  </template>
</template>

<style scoped>

</style>