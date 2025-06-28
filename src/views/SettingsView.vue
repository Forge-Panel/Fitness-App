<script setup lang="ts">
import {IonPage, IonBackButton, IonButtons, IonTitle, IonToolbar} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      Settings view
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>