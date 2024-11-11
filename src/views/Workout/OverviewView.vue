<script setup lang="ts">
import {add} from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonIcon,
  IonButton,
  IonToolbar, IonPage,
  IonSegment, IonSegmentView, IonSegmentContent, IonSegmentButton,
} from "@ionic/vue";
import WorkoutMostRecentList from "@/components/Workout/MostRecentList.vue";
import WorkoutTemplatesList from "@/components/WorkoutTemplates/List.vue";
import ExercisesList from "@/components/Exercises/List.vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-segment>
          <ion-segment-button value="history" content-id="history">
            <ion-label>History</ion-label>
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
        <ion-segment-content id="history">
          <ion-content fullscreen class="ion-padding">
            <WorkoutMostRecentList />
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="templates">
          <ion-content fullscreen class="ion-padding">
            <WorkoutTemplatesList />
            <br/>
            <ion-button expand="full" router-link="/tabs/workouts/create">
              <ion-icon :icon="add" />
              <ion-label>Create template</ion-label>
            </ion-button>
          </ion-content>
        </ion-segment-content>
        <ion-segment-content id="exercises">
          <ion-content fullscreen class="ion-padding">
            <ExercisesList />
          </ion-content>
        </ion-segment-content>
      </ion-segment-view>
  </ion-page>
</template>

<style scoped>

</style>