<script setup lang="ts">
import {list} from "ionicons/icons";
import {IonButton, IonIcon, IonItem, IonList, IonListHeader, IonPopover, IonText} from "@ionic/vue";
import {useToggle} from "@vueuse/core";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const model = defineModel()
const [isSortByOpen, toggleSortBy] = useToggle(false)

</script>

<template>
  <ion-button color="light" id="popover-button" @click="toggleSortBy()" shape="round"><ion-icon slot="icon-only" :icon="list" /></ion-button>
  <ion-popover v-model:is-open="isSortByOpen" trigger="popover-button" :dismiss-on-select="true">
    <ion-list lines="none">
      <ion-list-header>{{ t('exercise.sortByLabel') }}</ion-list-header>
      <ion-item button @click="model = 'name'"><ion-text :color="model === 'name' ? 'primary' : 'default'">{{ t('exercise.sortBy.name') }}</ion-text></ion-item>
      <ion-item button @click="model = 'category'"><ion-text :color="model === 'category' ? 'primary' : 'default'">{{ t('exercise.sortBy.category') }}</ion-text></ion-item>
      <ion-item button @click="model = 'bodyPart'"><ion-text :color="model === 'bodyPart' ? 'primary' : 'default'">{{ t('exercise.sortBy.bodyPart') }}</ion-text></ion-item>
    </ion-list>
  </ion-popover>
</template>