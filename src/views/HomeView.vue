<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Todo App</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          :debounce="1000"
          @ionChange="handleSearch($event)"
          @ionClear="getTodos()"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-fab vertical="top" horizontal="end" edge slot="fixed">
        <ion-fab-button @click="createTodo">
          <ion-icon :icon="save"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-list>
        <ion-item>
          <ion-label position="stacked">New Todo</ion-label>
          <ion-input v-model="name" placeholder="To do something"></ion-input>
          <ion-input
            v-model="description"
            placeholder="More details on it ..."
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-item-sliding v-for="aTodo in todos" :key="aTodo.id">
          <ion-item>
            <ion-label>
              <h2>{{ aTodo.name }}</h2>
              <p>{{ aTodo.description }}</p>
            </ion-label>
          </ion-item>

          <ion-item-options>
            <ion-item-option @click="deleteTodo(aTodo)" color="danger"
              >Delete</ion-item-option
            >
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { DataStore } from 'aws-amplify'
import { ref } from 'vue'
import { Todo } from '../models/index'
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
} from '@ionic/vue'

import { save } from 'ionicons/icons'

const name = ref('')
const description = ref('')
const todos = ref([])

const createTodo = () => {
  if (!name.value || !description.value) return

  const aNewTodo = new Todo({
    name: name.value,
    description: description.value,
  })

  DataStore.save(aNewTodo)
    .then(() => {
      todos.value = [...todos.value, aNewTodo]

      name.value = ''
      description.value = ''
    })
    .catch((error) => console.error('Error saving todo', error))
}

const getTodos = () => {
  DataStore.query(Todo)
    .then((existingTodos) => (todos.value = existingTodos))
    .catch((error) => console.error('Error retrieving todos', error))
}

const handleSearch = (event) => {
  const query = event.target.value.toLowerCase()
  todos.value = todos.value.filter(
    (d) => d.name.toLowerCase().indexOf(query) > -1
  )
}

const deleteTodo = (aToDeleteTodo) => {
  DataStore.delete(aToDeleteTodo)
    .then(
      () =>
        (todos.value = todos.value.filter(
          (aListedTodo) => aListedTodo != aToDeleteTodo
        ))
    )
    .catch((error) => console.error(error))
}

getTodos()
</script>
