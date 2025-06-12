<script setup lang="ts">
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip} from "@ionic/vue";
</script>

<template>
  
  <ion-card>
    <ion-card-header>
      <ion-card-title>Full bofffdy 1</ion-card-title>
      <ion-card-subtitle>Completed on 2024-11-06</ion-card-subtitle>
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
      <ion-card-title>Full bofffdy 1</ion-card-title>
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
  <ion-card @press="console.log('long press')">
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