<template>
  <div @mouseover="hovering = true" @mouseleave="hovering = false" class="task" :class="isDone ? 'task-done' : 'task'">
    <div class="task-button-text-group">
      <div class="button-base" :class="isDone ? 'button-done' : 'button'" @click="toggle(taskId)">
        <el-icon>
          <Check />
        </el-icon>
      </div>
      <div style="width: 20rem; word-wrap: break-word;">
        {{ text }}
      </div>
    </div>
    <el-icon :class="{ 'visible': hovering }" class="delete" size="large" @click="deleteTask(taskId)">
      <Delete />
    </el-icon>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Check, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  isDone: {
    type: Boolean,
    default: false
  },
  taskId: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['toggleStatus', 'deleteTask'])
const toggle = (id) => {

  emit('toggleStatus', id)
}
const deleteTask = (id) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this task?',
    'Delete Task',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'warning',
      showClose: false,
    }
  ).then(() => {
    emit('deleteTask', id)
    ElMessage({
      type: 'success',
      message: 'Task successfully deleted',
    })
  })
}
const hovering = ref(false)
</script>
<style lang="scss" scoped>
.task-done {

  text-decoration: line-through;
  color: #888d92;

  .button-done {
    background-color: #888d92;
    color: white;
  }

  &:hover {
    cursor: pointer;

  }
}

.task {

  display: flex;
  align-items: flex;
  justify-content: space-between;
  gap: 1rem;
  border: 1px #babfc5 solid;
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.3s ease;
  user-select: none;
  margin-bottom: .75rem;

  .task-button-text-group {
    display: flex;
    align-items: center;
    gap: 1rem
  }

  .button-base {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    user-select: none;
    transition: all 0.3s ease;

  }

  .button {
    color: white;
    background-color: green;

    &:hover {
      cursor: pointer;
      background-color: rgb(6, 71, 6);
    }
  }

  &:hover {
    background-color: #babfc5;

  }

  .delete {
    visibility: hidden;
    color: red;
    margin-top: auto;
    margin-bottom: auto;

    &:hover {
      cursor: pointer;
      color: rgb(182, 5, 5);
    }

    &.visible {
      visibility: visible;
    }
  }



}
</style>