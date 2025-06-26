<script setup lang="ts">
import {funnel} from "ionicons/icons";
import {IonButton, IonIcon, IonChip, IonPopover, IonContent, IonList} from "@ionic/vue";
import {useToggle} from "@vueuse/core";
import {ExerciseBodyPart, ExerciseCategory} from "@/lib/types/Exercise";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const [isOpen, toggleIsOpen] = useToggle(false)

const category = defineModel<(ExerciseCategory)[]>('category', {required: true})

function toggleCategory(key: ExerciseCategory) {
  const index = category.value.indexOf(key)
  if (index < 0) {
    category.value.push(key)
  } else {
    category.value.splice(index, 1)
  }
}

const bodyPart = defineModel<(ExerciseBodyPart)[]>('bodyPart', {required: true})

function toggleBodyPart(key: ExerciseBodyPart) {
  const index = bodyPart.value.indexOf(key)
  if (index < 0) {
    bodyPart.value.push(key)
  } else {
    bodyPart.value.splice(index, 1)
  }
}

const emits = defineEmits(['update'])
</script>

<template>
  <ion-button color="light" id="filter-popover" shape="round" @click="toggleIsOpen()"><ion-icon slot="icon-only" :icon="funnel" /></ion-button>
  <ion-popover v-model:is-open="isOpen" trigger="filter-popover" @willDismiss="emits('update')">
    <ion-content class="ion-padding-horizontal">
      <h4>Category</h4>
      <ion-chip v-for="(name, key) in ExerciseCategory" :key="key" :color="category.includes(key as ExerciseCategory) ? 'primary' : undefined" @click="toggleCategory(key as ExerciseCategory)">{{
          t(`exercise.category.${key}`)
        }}</ion-chip>
      <h4>Bodyparts</h4>
      <ion-chip v-for="(name, key) in ExerciseBodyPart" :key="key" :color="bodyPart.includes(key as ExerciseBodyPart) ? 'primary' : undefined" @click="toggleBodyPart(key as ExerciseBodyPart)">{{
          t(`exercise.bodyPart.${key}`)
        }}</ion-chip>
    </ion-content>
  </ion-popover>
</template>