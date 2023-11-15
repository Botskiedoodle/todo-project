import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const taskCount = ref(0)
  const doneTasks = ref(0)
  const tasks = ref([])
  const taskId = ref(1)

  const addTask = (text) => {
    while (tasks.value.some(task => task.id === taskId.value)) {
      taskId.value++;
    }
    let task = {
      id: taskId.value,
      text: text,
      status: {
        done: false
      }
    }
    tasks.value.push({ ...task })
    taskId.value++;
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const toggleTaskStatus = (id) => {
    tasks.value.filter(task => {
      if (task.id === id) {
        task.status.done = !task.status.done
      }
    })
  }

  const removeDoneTasks = () => {
    tasks.value = tasks.value.filter(task => {
      return task.status.done !== true
    })
  }
  return { taskCount, doneTasks, tasks, addTask, deleteTask, toggleTaskStatus, removeDoneTasks }
})
