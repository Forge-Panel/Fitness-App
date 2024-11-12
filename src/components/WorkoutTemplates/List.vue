<script setup lang="ts">
import {IonCard, IonCardContent, IonCardHeader, IonSearchbar, IonCardSubtitle, IonCardTitle, IonChip, IonRefresher, IonRefresherContent,} from "@ionic/vue";

function handleRefresh(event: any) {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
}
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-searchbar></ion-searchbar>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Full body 1</ion-card-title>
      <ion-card-subtitle>Small description of the workout</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <h2>6 exercises</h2>
      <ion-chip>Legs</ion-chip>
      <ion-chip>Arms</ion-chip>
      <ion-chip>Core</ion-chip>
    </ion-card-content>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Full body 1</ion-card-title>
      <ion-card-subtitle>Small description of the workout</ion-card-subtitle>
    </ion-card-header>
    
    <ion-card-content>
      <h2>6 exercises</h2>
      <ion-chip>Legs</ion-chip>
      <ion-chip>Arms</ion-chip>
      <ion-chip>Core</ion-chip>
    </ion-card-content>
  </ion-card>
</template>