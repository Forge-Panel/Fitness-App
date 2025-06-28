<script setup lang="ts">
import {
  IonPage, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, IonLabel, IonIcon,
} from '@ionic/vue';
import {
  barbellOutline, barbellSharp, footstepsOutline, footstepsSharp, homeOutline, homeSharp, personOutline, personSharp, pulseOutline, pulseSharp
} from "ionicons/icons";
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Overview" href="/tabs/dashboard">
          <ion-icon :ios="homeOutline" :md="homeSharp" />
          <ion-label>Overview</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Workouts" href="/tabs/workouts">
          <ion-icon :ios="barbellOutline" :md="barbellSharp" />
          <ion-label>Workouts</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Profile" href="/tabs/profile">
          <ion-icon :ios="personOutline" :md="personSharp" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<style scoped>

</style>