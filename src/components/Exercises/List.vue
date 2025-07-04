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
  IonSkeletonText, toastController
} from '@ionic/vue'
import ExerciseFilter from "@/components/Exercises/Filter.vue"
import ExerciseOrderBy from "@/components/Exercises/OrderBy.vue"
import {computed, ref} from "vue";
import {useQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag'
import {barbell} from 'ionicons/icons';
import { useI18n } from 'vue-i18n'
import {ExerciseBodyPart, ExerciseCategory} from "@/lib/types/Exercise";
import {useStorage} from "@vueuse/core";
const { t } = useI18n()


async function showToast(message: string) {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: 'bottom'
  });
  
  await toast.present();
}

// Query filters
const querySearch = ref<string>('')
const queryCategory = ref<ExerciseCategory[]>([])
const queryBodyPart = ref<ExerciseBodyPart[]>([])
const queryOrderBy = useStorage<'name' | 'category' | 'bodyPart'>('exerciseOrderBy', 'name')



const { result, loading, error, refetch, onError } = useQuery(gql`
      query getExercises ($search: String = null, $category: [ExerciseCategory!], $bodyPart: [ExerciseBodyPart!], $orderBy: [ExerciseOrderBy!]) {
        exercises {
          all(count: 100, search: $search, category: $category, bodyPart: $bodyPart, orderBy: $orderBy) {
            id
            name
            category
            bodyPart
          }
        }
      }
    `, {
  search: null as string | null,
  category: [] as ExerciseCategory[],
  bodyPart: [] as ExerciseBodyPart[],
  orderBy: [{field: 'NAME', order: 'ASC'}],
}, {keepPreviousResult: true})

async function updateVariables() {
  const orderBy = [{field: 'NAME', order: 'ASC'}]
  
  if (queryOrderBy.value !== 'name') {
    orderBy.push({field: queryOrderBy.value === 'category' ? 'CATEGORY' : 'BODY_PART', order: 'ASC'})
  }
  
  await refetch({
    search: querySearch.value ? querySearch.value : null,
    category: [...queryCategory.value],
    bodyPart: [...queryBodyPart.value],
    orderBy: orderBy
  })
}

async function clearSearch() {
  querySearch.value = ''
  
  await updateVariables()
}

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
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(exercise => {
      let groupKey = queryOrderBy.value === 'name' ? exercise.name[0].toUpperCase() : exercise[queryOrderBy.value]
      
      if (!exerciseMap.has(groupKey)) {
        exerciseMap.set(groupKey, [])
      }
      
      exerciseMap.get(groupKey).push(exercise)
    })
  
  // And to finish up, sort them on the grouped by key.
  return exerciseMap.entries().toArray().sort((a: [string, any], b: [string, any]) => a[0].localeCompare(b[0]))
});

const emits = defineEmits(['click-exercise'])
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-searchbar v-model="querySearch" @ionChange="updateVariables" @ionClear="clearSearch" :placeholder="t('exercise.searchInputPlaceholder')"></ion-searchbar>
  <ExerciseFilter v-model:category="queryCategory" v-model:bodyPart="queryBodyPart" @update="updateVariables" />
  <ExerciseOrderBy v-model="queryOrderBy" @update="updateVariables" />
  <template v-if="exercises && exercises.length > 0">
    <ion-list v-for="exerciseGroup in exercises" :key="exerciseGroup[0]" class="ion-margin-top" lines="none">
      <ion-list-header>
        <ion-label>
          <h1 v-if="queryOrderBy === 'name'">{{ exerciseGroup[0] }}</h1>
          <h1 v-else>{{ t(`exercise.${queryOrderBy}.${exerciseGroup[0]}`) }}</h1>
        </ion-label>
      </ion-list-header>
      <ion-item v-for="exercise in exerciseGroup[1]" :key="exercise.id" @click="emits('click-exercise', exercise)" button>
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