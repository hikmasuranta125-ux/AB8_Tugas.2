<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="ringkasan" href="/tabs/ringkasan">
          <ion-icon aria-hidden="true" :icon="partlySunnyOutline" />
          <ion-label>Ringkasan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tabel" href="/tabs/tabel">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>Tabel</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="biodata" href="/tabs/biodata">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Biodata</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/vue';
import { listOutline, partlySunnyOutline, personCircleOutline } from 'ionicons/icons';
</script>
