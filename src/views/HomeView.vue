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
        <ion-fab-button @click="createTodoLocal">
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

      <todo-list :todos="todos" @delete="deleteTodoLocal" />
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
  IonItem,
  IonLabel,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
} from '@ionic/vue'

import { save } from 'ionicons/icons'

import TodoList from '@/components/TodoList.vue'

import deleteTodo from '@/composables/DeleteTodo'
import createTodo from '@/composables/CreateTodo'

const name = ref('')
const description = ref('')
const todos = ref([])

const createTodoLocal = () => {
  createTodo(name, description, todos)
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

const deleteTodoLocal = (aToDeleteTodo) => {
  deleteTodo(aToDeleteTodo, todos)
}

getTodos()

</script>
