import { DataStore } from 'aws-amplify'
import { Todo } from '@/models/index'
import {
  toastController,
  alertController
} from '@ionic/vue'

const createTodo = (name, description, todos) => {
  
    const aNewTodo = new Todo({
      name: name.value,
      description: description.value,
    })
  
    DataStore.save(aNewTodo)
      .then(async () => {
        todos.value = [...todos.value, aNewTodo]
  
        name.value = ''
        description.value = ''
  
        const toast = await toastController.create({
          message: 'Created!',
          duration: 1500,
          position: 'top',
        })
  
        await toast.present()
      })
      .catch(async (error) => {
        const alert = await alertController.create({
          header: 'Error',
          subHeader: 'Could not create Todo',
          message: 'Check console log for details.',
          buttons: ['OK'],
        })
  
        await alert.present()
  
        console.error('Error saving todo', error)
      })
  }

  export default createTodo