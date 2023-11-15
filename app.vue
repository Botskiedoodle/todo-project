<template>
  <div class="app">
    <div class="title">Vue ToDo List</div>
    <div class="main">
      <div class="header-container">
        <div class="header">
          <HeaderItem :title="'Tasks'" :number="taskStore.tasks.length" @click="filterTasks" />
          <HeaderItem :title="'Tasks Done'" :number="doneTasks" @click="filterDoneTasks" />

          <transition name="fade">
            <div v-if="checkForDoneTask">
              <el-button type="danger" :icon="Delete" class="item-delete" size="small" @click="deleteDoneTasks">Tasks
                Done</el-button>
            </div>
          </transition>
          <el-button type="danger" :icon="Delete" class="item-delete" size="small" @click="deleteAll">Tasks</el-button>
        </div>
      </div>
      <div class="tasks">
        <div v-if="dataLoaded">
          <transition-group tag="div" name="fade" appear mode="out-in">
            <div v-for="task in taskStore.tasks" :key="task.id">
              <TaskItem :text="task.text" :isDone="task.status.done" :taskId="task.id" @toggle-status="toggleTaskStatus"
                v-if="filterItem(task)" @delete-task="deleteTask" />
            </div>
          </transition-group>
        </div>
        <div v-if="dataFetching === true" class="loading">
          <img src="./assets/loading.svg" alt="loading">
        </div>

        <div v-if="noData">
          <div>
            <el-empty description="You don't have any pending tasks." :image-size="120" />
          </div>
        </div>
      </div>
      <div class="input-container">
        <input type="text" placeholder="New Task" class="input" v-model="newTask" @keyup.enter="addTask"
          @focus="handleFocus">
        <div class="add-button" @click="addTask">
          +
        </div>
      </div>
    </div>
    <InfoView />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

import { useTaskStore } from './store/tasks'

import HeaderItem from './components/header.vue'
import TaskItem from './components/task.vue'
import InfoView from './components/info.vue'

const taskStore = useTaskStore()
const filterCriteria = ref('tasks')

const filterItem = (task) => {
  if (filterCriteria.value === 'done') {
    if (task.status.done) {
      return true
    }
  } else {
    return true
  }
}
const filterDoneTasks = () => {
  filterCriteria.value = 'done'
}

const filterTasks = () => {
  filterCriteria.value = 'tasks'
}

const dataFetching = ref(true)

const dataLoaded = computed(() => {
  return taskStore.tasks.length && dataFetching.value === false
})

const noData = computed(() => {
  return taskStore.tasks.length == 0 && dataFetching.value === false
})

const retrieveData = () => {
  dataFetching.value = true
  const getFromLocalStorage = localStorage.getItem('tasks')
  if (getFromLocalStorage) {
    taskStore.tasks = JSON.parse(getFromLocalStorage);
    dataFetching.value = false
  } else {
    taskStore.tasks = [];
  }
}
const storeData = () => {
  const storeToLocalStorage = JSON.stringify(taskStore.tasks)
  localStorage.setItem('tasks', storeToLocalStorage);
}

onMounted(() => {
  retrieveData()
})

const deleteDoneTasks = () => {
  ElMessageBox.confirm(
    'Are you sure you want to delete tasks marked as "done" ?',
    'Delete Done Tasks',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'warning',
      showClose: false,
    }
  ).then(() => {
    taskStore.removeDoneTasks()
    storeData()
    ElMessage({
      type: 'success',
      message: 'Done Tasks Successfully Deleted',
    })
  })
}

const deleteAll = () => {
  if (taskStore.tasks.length) {
    ElMessageBox.confirm(
      'This will delete all tasks. Are you sure you want to proceed?',
      'Delete All Tasks',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
        showClose: false,
      }
    ).then(() => {
      taskStore.tasks = []
      storeData()
      ElMessage({
        type: 'success',
        message: 'All Tasks Successfully Deleted',
      })
    })
  } else {
    ElMessageBox.alert('You have no pending tasks to delete.', 'Delete All Tasks', {
      confirmButtonText: 'OK',
    })
  }

}

const checkForDoneTask = computed(() => {
  return taskStore.tasks.some(task => task.status.done)
})

const doneTasks = computed(() => {
  return taskStore.tasks.reduce((result, task) => {
    if (task.status.done === true) {
      result++;
    }
    return result;
  }, 0);
});

const newTask = ref('')

const toggleTaskStatus = (id) => {
  taskStore.toggleTaskStatus(id)
  storeData()
}

const deleteTask = (id) => {
  taskStore.deleteTask(id)
  storeData()
}

const addTask = () => {
  if (newTask.value.trim() !== '') {
    taskStore.addTask(newTask.value.trim())
    storeData()
    newTask.value = ''
  }
}

</script>
<style>
body {
  margin: 0px;
  font-family: 'Roboto', sans-serif;

}
</style>
<style lang="scss" scoped>
.loading {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.fade-enter-active,
.fade-leave-active {

  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: all .5s ease;
}

.tasks {
  padding: 1.75rem;
  height: 16rem;
  overflow: auto;
}


.input-container {
  position: relative;
  background-color: #d1d5db;
  display: grid;
  place-items: center;
  padding: 1rem;
  margin-top: auto;

  .input {
    width: 26rem;
    padding: 1rem;
    border-radius: 100px;
    border: 2px solid #3679BA;
    transition: border-color 0.3s ease;
    color: #3679BA;
    font-weight: 600;

    &:focus {
      border: 2px solid #3679BA;
      outline: none;
    }
  }


  .add-button {
    color: white;
    background-color: #3679BA;
    aspect-ratio: 1;
    height: 2.25rem;
    border-radius: 100%;
    display: grid;
    place-items: center;
    font-size: 1.75rem;
    position: absolute;
    right: 54px;
    transition: background-color 0.3s ease;
    user-select: none;

    &:hover {
      cursor: pointer;
      background-color: #1F4F7D;
    }
  }
}

.app {

  height: 100vh;
  background: linear-gradient(to bottom, #05946c, #025763);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;

  .title {
    color: white;
    font-size: 3rem;
    font-weight: 700;
    padding: 1rem
  }

  .main {
    width: 34rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    font-weight: 600;

    .header-container {
      width: 100%;
      background-color: #d1d5db;
      display: flex;
      justify-content: flex-end;

      .header {
        display: flex;
        padding: 0.75rem;
        gap: .5rem;
        color: #fff;
        font-weight: 500;

        .item-delete {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          background-color: #FB4755;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          transition: background-color 300ms ease-in-out;
          border-radius: 0px;
          font-size: 14px;
          font-weight: 600;
          user-select: none;

          margin: 0;

          &:hover {
            background-color: #dc2626;
            cursor: pointer;
          }
        }
      }
    }
  }


}
</style>