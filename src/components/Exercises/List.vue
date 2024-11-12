<script setup lang="ts">
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonChip,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue'

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
  <ion-label>Order by: </ion-label>
  <ion-chip>Alphabet</ion-chip>
  <ion-chip>Category</ion-chip>
  <ion-chip>Method</ion-chip>
  <ion-list :inset="true">
    <ion-list-header>
      <ion-label>Core</ion-label>
    </ion-list-header>
    <ion-item v-for="i in 10" :key="i">
      <ion-label>Bench press</ion-label>
    </ion-item>
    <ion-list-header>
      <ion-label>Arms</ion-label>
    </ion-list-header>
    <ion-item v-for="i in 10" :key="i">
      <ion-label>Bench press</ion-label>
    </ion-item>
    <ion-list-header>
      <ion-label>Shoulders</ion-label>
    </ion-list-header>
    <ion-item v-for="i in 10" :key="i">
      <ion-label>Bench press</ion-label>
    </ion-item>
  </ion-list>
</template>

<style scoped>

</style>