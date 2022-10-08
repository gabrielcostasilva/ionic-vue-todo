import { DataStore } from 'aws-amplify'

import {
    toastController,
    alertController,
  } from '@ionic/vue'

const deleteTodo = (aToDeleteTodo, todos) => {
  DataStore.delete(aToDeleteTodo)
    .then(async () => {
      todos.value = todos.value.filter(
        (aListedTodo) => aListedTodo != aToDeleteTodo
      )

      const toast = await toastController.create({
        message: 'Deleted!',
        duration: 1500,
        position: 'top',
      })

      await toast.present()
    })
    .catch(async (error) => {
      const alert = await alertController.create({
        header: 'Error',
        subHeader: 'Could not delete Todo',
        message: 'Check console log for details.',
        buttons: ['OK'],
      })

      await alert.present()

      console.error(error)
    })
}

export default deleteTodo