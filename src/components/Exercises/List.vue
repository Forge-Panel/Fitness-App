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
import {computed, onBeforeMount, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag'

const { result, loading, error, refetch } = useQuery(gql`
      query getExercises {
        exercises {
          all(count: 1000) {
            id
            name
          }
        }
      }
    `)

async function handleRefresh(event: any) {
  refetch()
  
  event.target.complete();
}
onBeforeMount(async () => {
})

const sortBy = ref('alphabet')

const exercises = computed(() => {
  return result.value?.exercises?.all
})
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
  <ion-list v-if="exercises">
    <ion-list-header class="ion-padding-top" lines="inset">
      <ion-label><h1>test</h1></ion-label>
    </ion-list-header>
    <ion-item v-for="exercise in exercises" :key="exercise.id">
      <ion-label>{{ exercise.name }}</ion-label>
    </ion-item>
  </ion-list>
  <ion-list v-if="sortBy === 'alphabet'">
<!--    <template  v-for="exercise in result.all" :key="exercise.id">-->
<!--      <ion-list-header class="ion-padding-top" lines="inset">-->
<!--        <ion-label><h1>{{ exercises[0] }}</h1></ion-label>-->
<!--      </ion-list-header>-->
<!--      <ion-item v-for="exercise in exercises[1]" :key="exercise.id">-->
<!--        <ion-label>{{ exercise.name }}</ion-label>-->
<!--      </ion-item>-->
<!--    </template>-->
  </ion-list>
  <ion-list v-else-if="sortBy === 'category'">
    <template v-for="(exercises, exerciseKey) in []" :key="exerciseKey">
      <ion-list-header class="ion-padding-top" lines="inset">
        <ion-label><h1>{{ exercises[0] }}</h1></ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exercises[1]" :key="exercise.id">
        <ion-label>{{ exercise.name }}</ion-label>
      </ion-item>
    </template>
  </ion-list>
  <ion-list v-else-if="sortBy === 'bodyPart'">
    <template v-for="(exercises, exerciseKey) in []" :key="exerciseKey">
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