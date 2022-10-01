<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name" />
    <input type="text" v-model="description" placeholder="Todo description" />
    <button v-on:click="createTodo">Create Todo</button>
    <div v-for="item in todos" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { DataStore } from 'aws-amplify'
import { ref } from 'vue'
import { Todo } from '../models/index'

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
      todos = [...todos, aNewTodo]

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

getTodos()
</script>
