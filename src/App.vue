<template>
  <authenticator>
    <ion-app>
      <!-- <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1> -->

      <!-- <button @click="signOut">Sign Out</button>
      </template> -->
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  </authenticator>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

import { IonApp, IonRouterOutlet } from '@ionic/vue'
</script>
