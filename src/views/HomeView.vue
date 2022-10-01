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

<script>
import { DataStore } from 'aws-amplify'
import { Todo } from '../models/index'

export default {
  name: 'App',
  async created() {
    this.getTodos()
  },
  data() {
    return {
      name: '',
      description: '',
      todos: [],
    }
  },
  methods: {
    async createTodo() {
      const { name, description } = this
      if (!name || !description) return

      try {
        await DataStore.save(
          new Todo({
            name: name,
            description: description,
          })
        )
        console.log('Todo saved successfully!')
      } catch (error) {
        console.log('Error saving post', error)
      }

      const todo = { name, description }
      this.todos = [...this.todos, todo]

      this.name = ''
      this.description = ''
    },
    async getTodos() {
      try {
        const todos = await DataStore.query(Todo)
        console.log(
          'Todos retrieved successfully!',
          JSON.stringify(todos, null, 2)
        )
        this.todos = todos
        
      } catch (error) {
        console.log('Error retrieving todos', error)
      }
    },
  },
}
</script>
