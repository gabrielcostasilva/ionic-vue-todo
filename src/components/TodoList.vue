<template>
  <ion-list>
    <ion-item-sliding v-for="aTodo in todos" :key="aTodo.id">
      <ion-item>
        <ion-label>
          <h2>{{ aTodo.name }}</h2>
          <p>{{ aTodo.description }}</p>
        </ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option @click="$emit('delete', aTodo)" color="danger"
          >Delete</ion-item-option
        >
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script setup>
import {
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonLabel,
} from '@ionic/vue'

import { defineProps, defineEmits } from 'vue'

defineProps([
    'todos'
])

defineEmits([
    'delete'
])
</script>
