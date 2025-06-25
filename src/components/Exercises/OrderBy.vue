<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {list} from "ionicons/icons";
import {IonButton, IonIcon, IonItem, IonList, IonListHeader, IonPopover, IonText} from "@ionic/vue";
import {useToggle} from "@vueuse/core";

const { t } = useI18n()

const model = defineModel<string>()
const [isOpen, toggleIsOpen] = useToggle(false)

const emits = defineEmits(['update'])
</script>

<template>
  <ion-button color="light" id="sortby-popover" @click="toggleIsOpen()" shape="round"><ion-icon slot="icon-only" :icon="list" /></ion-button>
  <ion-popover v-model:is-open="isOpen" trigger="sortby-popover" :dismiss-on-select="true" @willDismiss="emits('update')">
    <ion-list lines="none">
      <ion-list-header>{{ t('exercise.sortByLabel') }}</ion-list-header>
      <ion-item button @click="model = 'name'"><ion-text :color="model === 'name' ? 'primary' : 'default'">{{ t('exercise.sortBy.name') }}</ion-text></ion-item>
      <ion-item button @click="model = 'category'"><ion-text :color="model === 'category' ? 'primary' : 'default'">{{ t('exercise.sortBy.category') }}</ion-text></ion-item>
      <ion-item button @click="model = 'bodyPart'"><ion-text :color="model === 'bodyPart' ? 'primary' : 'default'">{{ t('exercise.sortBy.bodyPart') }}</ion-text></ion-item>
    </ion-list>
  </ion-popover>
</template>

<style scoped>

</style>