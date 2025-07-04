<script setup lang="ts">
import {add} from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonFab, IonFabButton,
  IonToolbar, IonPage,
  IonSegment, IonSegmentView, IonSegmentContent, IonSegmentButton, IonTitle,
} from "@ionic/vue";
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import WorkoutMostRecentList from "@/components/Workout/MostRecentList.vue";
import WorkoutTemplatesList from "@/components/WorkoutTemplates/List.vue";
import ExercisesList from "@/components/Exercises/List.vue";
import {ref} from "vue";

const toolbar = ref('recents')
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Workouts</ion-title>
        <ion-buttons slot="primary">
          <ion-button router-link="/settings">
            <ion-icon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="toolbar">
          <ion-segment-button value="recents" content-id="recents">
            <ion-label>Recents</ion-label>
          </ion-segment-button>
          <ion-segment-button value="templates" content-id="templates">
            <ion-label>Templates</ion-label>
          </ion-segment-button>
          <ion-segment-button value="exercises" content-id="exercises">
            <ion-label>Exercises</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
      <ion-segment-view>
        <ion-segment-content id="recents">
          <ion-content fullscreen class="ion-padding">
            <ion-button expand="full" router-link="/workouts/new">
              <ion-icon :icon="add" />
              <ion-label>Start workout</ion-label>
            </ion-button>
            <br/>
            <WorkoutMostRecentList />
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="templates">
          <ion-content fullscreen class="ion-padding">
            <ion-button expand="full" router-link="/workouts/new">
              <ion-icon :icon="add" />
              <ion-label>Create template</ion-label>
            </ion-button>
            <br/>
            <WorkoutTemplatesList />
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="exercises">
          <ion-content fullscreen class="ion-padding">
            <ExercisesList v-if="toolbar === 'exercises'" />
          </ion-content>
        </ion-segment-content>
      </ion-segment-view>
    
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button router-link="/workouts/new">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<style scoped>

</style>