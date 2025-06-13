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
import {computed, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag'

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

const sortBy = ref('alphabet')

const exercises = computed(() => {
  if (!result.value?.exercises?.all) {
    return []
  }
  
  const exerciseMap = new Map()
  
  result.value?.exercises?.all.forEach(exercise => {
    if (!exerciseMap.has(exercise[sortBy.value])) {
      exerciseMap.set(exercise[sortBy.value], [])
    }
    
    exerciseMap.get(exercise[sortBy.value]).push(exercise)
  })
  
  return exerciseMap.entries()
})
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-searchbar></ion-searchbar>
  <ion-label>Order by: </ion-label>
  <ion-chip :color="sortBy === 'alphabet' ? 'primary' : 'default'" @click="sortBy = 'name'">Alphabet</ion-chip>
  <ion-chip :color="sortBy === 'category' ? 'primary' : 'default'" @click="sortBy = 'category'">Category</ion-chip>
  <ion-chip :color="sortBy === 'bodyPart' ? 'primary' : 'default'" @click="sortBy = 'bodyPart'">Body part</ion-chip>
  <ion-list v-if="exercises">
    <template v-for="exerciseGroup in exercises" :key="exerciseGroup[0]">
      <ion-list-header>
        <ion-label><h1>{{ exerciseGroup[0] }}</h1></ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exerciseGroup[1]" :key="exercise.id">
        <ion-label>{{ exercise.name }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
</template>

<style scoped>

</style>