import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { homeOutline, homeSharp, barbellOutline, barbellSharp, personOutline, personSharp, pulseOutline, pulseSharp, footstepsOutline, footstepsSharp } from 'ionicons/icons';
import Tabs from "@/components/Tabs.vue";

declare module 'vue-router' {
  interface RouteMeta {
    iosIcon: string;
    mdIcon: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/overview'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'overview',
      },
      {
        path: 'overview',
        component: () => import ('@/views/OverviewView.vue'),
        meta: {
          iosIcon: homeOutline,
          mdIcon: homeSharp,
        }
      },
      {
        path: 'steps',
        component: () => import ('@/views/StepsView.vue'),
        meta: {
          iosIcon: footstepsOutline,
          mdIcon: footstepsSharp,
        }
      },
      {
        path: 'workouts',
        component: () => import ('@/views/Workout/OverviewView.vue'),
        meta: {
          iosIcon: barbellOutline,
          mdIcon: barbellSharp,
        }
      },
      {
        path: 'workouts/create',
        component: () => import ('@/views/Workout/CreateView.vue'),
        meta: {
          iosIcon: barbellOutline,
          mdIcon: barbellSharp,
        }
      },
      {
        path: 'vitals',
        component: () => import ('@/views/VitalsView.vue'),
        meta: {
          iosIcon: pulseOutline,
          mdIcon: pulseSharp,
        }
      },
      {
        path: 'profile',
        component: () => import ('@/views/ProfileView.vue'),
        meta: {
          iosIcon: personOutline,
          mdIcon: personSharp,
        }
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
