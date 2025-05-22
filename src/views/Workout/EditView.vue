<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/vue";
import {useRouter} from "vue-router";
import WorkoutTemplateEdit from "@/components/WorkoutTemplates/Edit.vue"

const router = useRouter()
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>New workout</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <WorkoutTemplateEdit />
      <br />
      <ion-button expand="block" fill="outline" color="danger" @click="router.back()">Cancel</ion-button>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>