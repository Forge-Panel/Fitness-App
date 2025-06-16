<script setup lang="ts">
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSkeletonText, toastController, IonText, IonPopover
} from '@ionic/vue'
import {computed, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag'
import { barbell, funnel, list } from 'ionicons/icons';
import { useI18n } from 'vue-i18n'
import {useToggle} from "@vueuse/core";
const { t } = useI18n()

const filter = ref('')
const [isFilterOpen, toggleFilter] = useToggle(false)

const sortBy = ref('name')
const [isSortByOpen, toggleSortBy] = useToggle(false)

async function showToast(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: 'bottom'
  });
  
  await toast.present();
}

const { result, loading, error, refetch, onError } = useQuery(gql`
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

onError(() => {
  showToast("Error loading data.")
})

async function handleRefresh(event: any) {
  await refetch()?.finally(() => {
    event.target.complete();
  })
  
}


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
  <ion-icon @click="toggleFilter" :icon="funnel" size="large" />
  <ion-searchbar v-show="isFilterOpen" v-model="filter" :placeholder="t('exercise.searchInputPlaceholder')"></ion-searchbar>
  <ion-icon id="popover-button" @click="toggleSortBy" :icon="list" size="large" />
  <ion-popover v-model:is-open="isSortByOpen" trigger="popover-button" :dismiss-on-select="true">
    <ion-list lines="none">
      <ion-item button @click="sortBy = 'name'"><ion-text :color="sortBy === 'name' ? 'primary' : 'default'">{{ t('exercise.sortBy.name') }}</ion-text></ion-item>
      <ion-item button @click="sortBy = 'category'"><ion-text :color="sortBy === 'category' ? 'primary' : 'default'">{{ t('exercise.sortBy.category') }}</ion-text></ion-item>
      <ion-item button @click="sortBy = 'bodyPart'"><ion-text :color="sortBy === 'bodyPart' ? 'primary' : 'default'">{{ t('exercise.sortBy.bodyPart') }}</ion-text></ion-item>
    </ion-list>
  </ion-popover>
  <template v-if="exercises && exercises.length > 0">
    <ion-list v-for="exerciseGroup in exercises" :key="exerciseGroup[0]" class="ion-margin-top" lines="none">
      <ion-list-header>
        <ion-label>
          <h1 v-if="sortBy === 'name'">{{ exerciseGroup[0] }}</h1>
          <h1 v-else>{{ t(`exercise.${sortBy}.${exerciseGroup[0]}`) }}</h1>
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
  <ion-item v-else-if="error" lines="none" class="ion-margin-top">Something went wrong</ion-item>
  <template v-else-if="loading">
    <ion-list v-for="i in 2" :key="i" class="ion-margin-top" lines="none">
      <ion-list-header>
        <ion-label>
          <h1><ion-skeleton-text  :animated="true" style="width: 20%"></ion-skeleton-text></h1>
        </ion-label>
      </ion-list-header>
      <ion-item v-for="j in 3" :key="j">
        <ion-skeleton-text  :animated="true" style="width: 32px; height: 32px; border-radius: 9999px; margin-right: 20px;"></ion-skeleton-text>
        <ion-label>
          <h2><ion-skeleton-text  :animated="true" style="width: 40%"></ion-skeleton-text></h2>
        </ion-label>
      </ion-item>
    </ion-list>
  </template>
  <ion-item v-else lines="none" class="ion-margin-top">No exercises found.</ion-item>
</template>

<style scoped>

</style>